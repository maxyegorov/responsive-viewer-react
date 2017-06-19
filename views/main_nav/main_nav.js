import strings from '../../strings/strings';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateWindowUrl, newWindow } from '../../actions';

class MainNav extends Component {
    constructor(props) {
        super(props);
    }

    delayLookup() {
        const $this = this;
        let currentValue = this.refs.mainUrl.value;

        setTimeout(() => {
            if (currentValue == $this.refs.mainUrl.value) {
                 if (currentValue.indexOf('http://') == -1 && currentValue.indexOf('https://') == -1) {
                     currentValue = `http://${currentValue}`;
                     $this.refs.mainUrl.value = currentValue;
                 }

                 $this.props.updateWindowUrl(currentValue);
            }
        }, 500);
    }

    urlChange() {
        if (this.refs.mainUrl.value.indexOf('.') !== -1) this.delayLookup();
    }

    doRefresh() {
        const $this = this;
        const currentValue = this.props.windows.mainUrl;

        this.props.updateWindowUrl('');
        setTimeout(() => { 
            $this.props.updateWindowUrl(currentValue); 
        }, 500);
    }
    
    newWindow() {
        this.props.newWindow();
    }
    
    removeWindow() {
        console.log('removed');
    }

	render() {
        return (
            <nav className="main-nav">
                <div className="fixed-left row-no-padding row">
                    <div className="col-md-6 col-sm-6 col-xs-6">
                        <img className="logo" src="images/responsive-viewer-logo.svg"/>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6 row-no-padding row">
                        {/*<div className="col-md-4 col-sm-4 col-xs-4">
                            <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-4">
                            <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </div>*/}
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <i onClick={ this.doRefresh.bind(this) } className={ `${ this.props.windows.windowsLoaded !== this.props.windows.windowsLoading ? 'spin' : '' } refresh-btn fa fa-refresh` } aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
                <div className="dynamic-middle">
                    <input ref="mainUrl" onChange={ this.urlChange.bind(this) } defaultValue={ this.props.windows.mainUrl } placeholder={ strings['en'].main_nav.urlPlaceholder }/>
                </div>
                <div className="fixed-right">
                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                </div>

                <ul className="settings-menu">
                    <li className="rv-presets">
                       <ul> 
                           { this.props.windows.workspaces.map((workspace, key) => <li key={ key }>{ workspace.name }</li>) }
                       </ul>
                    </li>
                    <li className="row">
                        <div className="col-md-8 col-sm-8 col-xs-8">
                            <input placeholder={ strings['en'].main_nav.workspaceNamePlaceholder }/>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-4">
                            <button>{ strings['en'].main_nav.saveBtnLabel }</button>
                        </div>
                    </li>
                    <li className="row">
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <button>{ strings['en'].main_nav.importBtnLabel }</button>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <button>{ strings['en'].main_nav.exportBtnLabel }</button>
                        </div>
                    </li>
                </ul>
                
                <i onMouseUp={ this.removeWindow.bind(this) } className="remove-window fa fa-trash" aria-hidden="true"></i>
                <i onClick={ this.newWindow.bind(this) } className="new-window fa fa-plus-circle" aria-hidden="true"></i>
            </nav>
        );
	}
}

function mapStateToProps({ ...state }) {
    return { ...state };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updateWindowUrl, newWindow }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);