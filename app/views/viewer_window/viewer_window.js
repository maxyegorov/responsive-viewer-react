import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  windowLoaded,
  updateSingleWindow,
  windowStartMoving,
  windowStopped,
  removeWindow,
} from '../../actions';
import getTranslation from '../../common/getTranslation';

import './viewer_window.scss';

class ViewerWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      zIndex: 100,
      windowMoving: false,
      windowX: 15,
      windowY: 95,
      showControls: false,
    };

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.windowLoaded = this.windowLoaded.bind(this);
    this.doRefresh = this.doRefresh.bind(this);
    this.urlChange = this.urlChange.bind(this);
    this.changeOrientation = this.changeOrientation.bind(this);
    this.presetChange = this.presetChange.bind(this);
    this.sizeChange = this.sizeChange.bind(this);
    this.toggleControls = this.toggleControls.bind(this);
    this.startMoving = this.startMoving.bind(this);
  }

  componentDidMount() {
    if (!window.rvApp) window.rvApp = {};
    if (window.rvApp && !window.rvApp.mousemove) window.rvApp.mousemove = {};
    if (window.rvApp && !window.rvApp.mouseup) window.rvApp.mouseup = {};

    if (window.rvApp) {
      window.rvApp.mousemove[this.props.index] = (event) => {
        this.onMouseMove(event);
      };

      window.rvApp.mouseup[this.props.index] = () => {
        this.onMouseUp(this);
      };
    }

    setTimeout(() => {
      this.setState({
        windowX: this.props.windowProps.windowX,
        windowY: this.props.windowProps.windowY,
      });
    }, 200);
  }

  componentWillUnmount() {
    delete window.rvApp.mousemove[this.props.index];
    delete window.rvApp.mouseup[this.props.index];
  }

  onMouseMove(event) {
    if (this.state.windowMoving) {
      this.setState({
        windowX: event.pageX - 8,
        windowY: event.pageY + 10,
      });
    }
  }

  onMouseUp() {
    if (
      this.state.windowX < 45
      && this.state.windowY > window.innerHeight - 45
    ) this.props.removeWindow(this.props.index);
    else {
      this.props.windowStopped(this.state.windowX, this.state.windowY, this.props.index);
      this.setState({ windowMoving: false, zIndex: 100 });
    }
  }

  startMoving(event) {
    event.preventDefault();
    this.props.windowStartMoving();
    this.setState({ windowMoving: true, zIndex: 200 });
  }

  windowLoaded() {
    if (this.windowIframe.src !== '') this.setState({ loading: false });
    if (this.windowIframe.src !== '') this.props.windowLoaded();
  }

  delayLookup() {
    let currentValue = this.windowUrl.value;

    setTimeout(() => {
      if (currentValue === this.windowUrl.value) {
        if (!currentValue.includes('http://') && !currentValue.includes('https://')) {
          currentValue = `http://${currentValue}`;
          this.windowUrl.value = currentValue;
        }
      }
    }, 500);
  }

  urlChange() {
    if (this.windowUrl.value.indexOf('.') !== -1) this.delayLookup();
  }

  doRefresh() {
    const $this = this;
    const currentValue = this.props.windowProps.src;

    this.windowIframe.src = '';
    setTimeout(() => {
      $this.setState({ loading: true });
      $this.windowIframe.src = currentValue;
    }, 500);
  }

  presetChange() {
    const preset = this.props.windows.presets[this.presetSelect.value];
    const newWindow = this.props.windowProps;

    newWindow.width = preset.width;
    this.windowWidth.value = preset.width;

    newWindow.height = preset.height;
    this.windowHeight.value = preset.height;

    newWindow.preset = this.presetSelect.value;
    this.props.updateSingleWindow(newWindow, this.props.key);
  }

  sizeChange() {
    const newWindow = this.props.windowProps;

    newWindow.width = this.windowWidth.value;
    newWindow.height = this.windowHeight.value;
    newWindow.scale = this.windowScale.value;

    this.props.updateSingleWindow(newWindow, this.props.key);
  }

  changeOrientation() {
    const newWindow = this.props.windowProps;
    newWindow.changeOrientation = !newWindow.changeOrientation;
    this.props.updateSingleWindow(newWindow, this.props.key);
  }

  toggleControls() {
    this.setState({ showControls: !this.state.showControls });
  }

  render() {
    return (
      <section
        ref={(el) => { this[`window-${this.props.index}`] = el; }}
        className={`${this.state.windowMoving ? 'active' : ''} window`}
        style={{
          zIndex: `${this.state.zIndex}`,
          top: `${this.state.windowY}px`,
          left: `${this.state.windowX}px`,
          width: `${this.props.windowProps.changeOrientation ?
            (this.props.windowProps.scale / 100) * this.props.windowProps.height
            : (this.props.windowProps.scale / 100) * this.props.windowProps.width}px`,
          height: `${this.props.windowProps.changeOrientation ?
            (this.props.windowProps.scale / 100) * this.props.windowProps.width
            : (this.props.windowProps.scale / 100) * this.props.windowProps.height}px`,
        }}
      >
        <iframe
          ref={(el) => { this.windowIframe = el; }}
          title={`window-${this.props.index}`}
          onLoad={this.windowLoaded}
          src={this.props.windowProps.src}
          style={{
            width: `${this.props.windowProps.changeOrientation ? this.props.windowProps.height : this.props.windowProps.width}px`,
            height: `${this.props.windowProps.changeOrientation ? this.props.windowProps.width : this.props.windowProps.height}px`,
            transform: `scale(${this.props.windowProps.scale / 100}, ${this.props.windowProps.scale / 100})`,
          }}
        />

        {this.props.windows.windowMoving ? <div className="move-helper" /> : ''}

        <nav className={`${this.state.showControls ? 'active' : ''} window-control row`}>
          <div className="col-md-2 col-sm-2 col-xs-2">
            <i
              role="button"
              onClick={this.doRefresh}
              className={`${this.state.loading ? 'spin' : ''} refresh-btn fa fa-refresh`}
              aria-hidden="true"
            />
          </div>
          <div className="col-md-10 col-sm-10 col-xs-10">
            <input
              ref={(el) => { this.windowUrl = el; }}
              onChange={this.urlChange}
              defaultValue={this.props.windowProps.src}
              placeholder={getTranslation('main_nav', 'urlPlaceholder')}
            />
          </div>

          <div className="col-md-2 col-sm-2 col-xs-2">
            <i
              role="button"
              onClick={this.changeOrientation}
              title={getTranslation('device_window', 'orientationHint')}
              className="fa fa-retweet"
              aria-hidden="true"
            />
          </div>
          <div className="col-md-10 col-sm-10 col-xs-10">
            <select
              ref={(el) => { this.presetSelect = el; }}
              defaultValue={this.props.windowProps.preset}
              onChange={this.presetChange}
            >
              { this.props.windows.presets.map((preset, key) => <option value={key} key={`preset-${preset.name}`}>{preset.name}</option>) }
            </select>
          </div>

          <div className="col-md-4 col-sm-4 col-xs-4">
            <input
              ref={(el) => { this.windowWidth = el; }}
              onChange={this.sizeChange}
              defaultValue={this.props.windowProps.width}
              placeholder={getTranslation('device_window', 'widthInputPlaceholder')}
            />
          </div>
          <div className="col-md-4 col-sm-4 col-xs-4">
            <input
              ref={(el) => { this.windowHeight = el; }}
              onChange={this.sizeChange}
              defaultValue={this.props.windowProps.height}
              placeholder={getTranslation('device_window', 'heightInputPlaceholder')}
            />
          </div>
          <div className="col-md-4 col-sm-4 col-xs-4">
            <input
              ref={(el) => { this.windowScale = el; }}
              onChange={this.sizeChange}
              defaultValue={this.props.windowProps.scale}
              placeholder={getTranslation('device_window', 'scaleInputPlaceholder')}
            />
          </div>
        </nav>

        <button
          title={getTranslation('device_window', 'controlsHint')}
          onClick={this.toggleControls}
          className="controls"
        >
          <i className="fa fa-ellipsis-v" aria-hidden="true" />
        </button>

        <button
          title={getTranslation('device_window', 'moveHint')}
          onMouseDown={this.startMoving}
          className="mover"
        >
          <i className="fa fa-arrows" aria-hidden="true" />
        </button>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    windowLoaded,
    updateSingleWindow,
    windowStartMoving,
    windowStopped,
    removeWindow,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewerWindow);
