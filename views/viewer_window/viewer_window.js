import strings from '../../strings/strings';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { windowLoaded, updateSingleWindow, windowStartMoving, windowStopped, removeWindow } from '../../actions';

class ViewerWindow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            zIndex: 100,
            windowMoving: false,
            windowX: 15,
            windowY: 95,
            showControls: false
        };
    }

    componentDidMount() {
        const $this = this;
        
        this.setState({
            windowX: this.props.windowProps.windowX,
            windowY: this.props.windowProps.windowY
        });

        if (!window.rvApp) window.rvApp = {};
        if (window.rvApp && !window.rvApp.mousemove) window.rvApp.mousemove = {};
        if (window.rvApp && !window.rvApp.mouseup) window.rvApp.mouseup = {};

        if (window.rvApp) {
            window.rvApp.mousemove[$this.props.index] = function (event) {
                $this.onMouseMove(event, $this);
            };

            window.rvApp.mouseup[$this.props.index] = function (event) {
                $this.onMouseUp($this);
            };
        }
        // this.moveListener = document.addEventListener('mousemove', (event) => this.onMouseMove(event, $this));
        // this.upListener = document.addEventListener('mouseup', () => this.onMouseUp($this));
    }

    componentWillUnmount() {
        const $this = this;

        delete  window.rvApp.mousemove[$this.props.index];
        delete  window.rvApp.mouseup[$this.props.index];
    }

    onMouseMove(event, $this) {
        if ($this.state.windowMoving) {
            $this.setState({
                windowX: event.pageX - 8,
                windowY: event.pageY + 10
            });
        }
    }

    onMouseUp($this) {
        if ($this.state.windowX < 45 && $this.state.windowY > window.innerHeight - 45)  $this.props.removeWindow($this.props.index);
        else {
            $this.props.windowStopped($this.state.windowX, $this.state.windowY, $this.props.index);
            $this.setState({ windowMoving: false, zIndex: 100 });
        } 
    }

    startMoving(event) {
        event.preventDefault();
        
        this.props.windowStartMoving();
        this.setState({ windowMoving: true, zIndex: 200 });
    }

    windowLoaded() {
        if (this.refs.windowIframe.src !== '') this.setState({ loading: false });
        if (this.refs.windowIframe.src !== '') this.props.windowLoaded();
    }
    
    delayLookup() {
        const $this = this;
        let currentValue = this.refs.windowUrl.value;

        setTimeout(() => {
            if (currentValue == $this.refs.windowUrl.value) {
                 if (currentValue.indexOf('http://') == -1 && currentValue.indexOf('https://') == -1) {
                     currentValue = `http://${currentValue}`;
                     $this.refs.windowUrl.value = currentValue;
                 }
            }
        }, 500);
    }
    
    urlChange() {
        if (this.refs.windowUrl.value.indexOf('.') !== -1) this.delayLookup();
    }

    doRefresh() {
        const $this = this;
        const currentValue = this.props.windowProps.src;

        this.refs.windowIframe.src = '';
        setTimeout(() => { 
            $this.setState({ loading: true });
            $this.refs.windowIframe.src = currentValue;
        }, 500);
    }
    
    presetChange() {
        const preset = this.props.windows.presets[this.refs.presetSelect.value];
        let newWindow = this.props.windowProps;
        
        newWindow.width = preset.width;
        this.refs.windowWidth.value = preset.width;
        
        newWindow.height = preset.height;
        this.refs.windowHeight.value = preset.height;
        
        newWindow.preset = this.refs.presetSelect.value;
        
        this.props.updateSingleWindow(newWindow, this.props.key);
    }
    
    sizeChange() {
        let newWindow = this.props.windowProps;
        
        newWindow.width = this.refs.windowWidth.value;
        newWindow.height = this.refs.windowHeight.value;
        newWindow.scale = this.refs.windowScale.value;
        
        this.props.updateSingleWindow(newWindow, this.props.key);
    }
    
    changeOrientation() {
        let newWindow = this.props.windowProps;
        
        if (newWindow.changeOrientation) newWindow.changeOrientation = false;
        else newWindow.changeOrientation = true;
        
        this.props.updateSingleWindow(newWindow, this.props.key);
    }
    
    toggleControls() {
        if (this.state.showControls) this.setState({ showControls: false });
        else this.setState({ showControls: true });
    }

	render() {
        return (
            <section 
                ref={ `window-${ this.props.index }` } 
                className={ `${ this.state.windowMoving ? 'active' : '' } window` } 
                style={{ 
                    zIndex: `${ this.state.zIndex }`, 
                    top: `${ this.state.windowY }px`, 
                    left: `${ this.state.windowX }px`, 
                    width: `${ this.props.windowProps.changeOrientation ? this.props.windowProps.scale / 100 * this.props.windowProps.height : this.props.windowProps.scale / 100 * this.props.windowProps.width }px`, 
                    height: `${ this.props.windowProps.changeOrientation ? this.props.windowProps.scale / 100 * this.props.windowProps.width : this.props.windowProps.scale / 100 * this.props.windowProps.height }px` 
                }}>
                
                <iframe 
                    ref="windowIframe"
                    onLoad={this.windowLoaded.bind(this)} 
                    src={ this.props.windowProps.src }
                    style={{ 
                        width: `${ this.props.windowProps.changeOrientation ? this.props.windowProps.height : this.props.windowProps.width }px`, 
                        height: `${ this.props.windowProps.changeOrientation ? this.props.windowProps.width : this.props.windowProps.height }px`, 
                        transform: `scale(${ this.props.windowProps.scale / 100 }, ${ this.props.windowProps.scale / 100 })` 
                    }}></iframe>
                
                { this.props.windows.windowMoving ? <div className="move-helper"></div> : '' }
                
                <nav className={ `${ this.state.showControls ? 'active' : '' } window-control row` }>
                    <div className="col-md-2 col-sm-2 col-xs-2">
                        <i onClick={ this.doRefresh.bind(this) } className={ `${ this.state.loading ? 'spin' : '' } refresh-btn fa fa-refresh` } aria-hidden="true"></i>
                    </div>
                    <div className="col-md-10 col-sm-10 col-xs-10">
                        <input ref="windowUrl" onChange={ this.urlChange.bind(this) } defaultValue={ this.props.windowProps.src } placeholder={ strings[this.props.globals.language].main_nav.urlPlaceholder }/>
                    </div>
                
                    <div className="col-md-2 col-sm-2 col-xs-2">
                        <i onClick={this.changeOrientation.bind(this)} title={strings[this.props.globals.language].device_window.orientationHint} className="fa fa-retweet" aria-hidden="true"></i>
                    </div>
                    <div className="col-md-10 col-sm-10 col-xs-10">
                        <select defaultValue={ this.props.windowProps.preset } ref="presetSelect" onChange={ () => this.presetChange() }>
                            { this.props.windows.presets.map((preset, key) => <option value={ key } key={ key }>{preset.name}</option>) }
                        </select>
                    </div>
                            
                    <div className="col-md-4 col-sm-4 col-xs-4">
                        <input ref="windowWidth" onChange={ this.sizeChange.bind(this) } defaultValue={ this.props.windowProps.width } placeholder={ strings[this.props.globals.language].device_window.widthInputPlaceholder }/>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                        <input ref="windowHeight" onChange={ this.sizeChange.bind(this) } defaultValue={ this.props.windowProps.height } placeholder={ strings[this.props.globals.language].device_window.heightInputPlaceholder }/>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                        <input ref="windowScale" onChange={ this.sizeChange.bind(this) } defaultValue={ this.props.windowProps.scale } placeholder={ strings[this.props.globals.language].device_window.scaleInputPlaceholder }/>
                    </div>
                </nav>

                <span title={ strings[this.props.globals.language].device_window.controlsHint } onClick={ this.toggleControls.bind(this) } className="controls">
                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                </span>

                <span title={ strings[this.props.globals.language].device_window.moveHint } onMouseDown={ (event) => this.startMoving(event) } className="mover">
                    <i className="fa fa-arrows" aria-hidden="true"></i>
                </span>
            </section>
        );
	}
}

function mapStateToProps({ ...state }) {
    return { ...state };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ windowLoaded, updateSingleWindow, windowStartMoving, windowStopped, removeWindow }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewerWindow);