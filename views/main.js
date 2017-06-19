import strings from '../strings/strings';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleLang } from '../actions';

import MainNav from './main_nav/main_nav';
import ViewerWindow from './viewer_window/viewer_window';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const $this = this;

        if (!window.rvApp) window.rvApp = {};
        if (!window.rvApp && !window.rvApp.mousemove) window.rvApp.mousemove = {};
        if (!window.rvApp && !window.rvApp.mouseup) window.rvApp.mouseup = {};
        
        this.moveListener = document.addEventListener('mousemove', (event) => {
            if (window.rvApp.mousemove) {
                for (let key in window.rvApp.mousemove) {
                    if (typeof window.rvApp.mousemove[key] == 'function') window.rvApp.mousemove[key](event);
                }
            }
        });

        this.upListener = document.addEventListener('mouseup', () => {
            if (window.rvApp.mouseup) {
                for (let key in window.rvApp.mouseup) {
                    if (typeof window.rvApp.mouseup[key] == 'function') window.rvApp.mouseup[key]();
                }
            }
        });
    }
    
    toggleLang() {
        this.props.toggleLang();
    }
    
	render() {
        return (
            <div className="responsive-viewer">
                <MainNav></MainNav>
                
                <div className="responsive-windows">
                    { this.props.windows.devices.map((device, key) => <ViewerWindow windowProps={ device } key={ key } index={ key }/>) }
                </div>
            </div>
        );
	}
}

function mapStateToProps({ ...state }) {
    return { ...state };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleLang }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);