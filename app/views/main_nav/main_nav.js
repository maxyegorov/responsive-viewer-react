import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  updateWindowUrl,
  newWindow,
  openModal,
  closeModal,
  saveWorkspace,
} from '../../actions';

import getTranslation from '../../common/getTranslation';
import delayLookup from './methods/delayLookup';
import urlChange from './methods/urlChange';
import doRefresh from './methods/doRefresh';
import toggleMenu from './methods/toggleMenu';
import removeWindow from './methods/removeWindow';
import saveCurrentWorkspace from './methods/saveCurrentWorkspace';

import TranslateText from '../../components/TranslateText';
import ModalWindow from '../modal_window/modal_window';

import './main_nav.scss';

class MainNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
    };

    this.doRefresh = doRefresh.bind(this);
    this.urlChange = urlChange.bind(this);
    this.toggleMenu = toggleMenu.bind(this);
    this.saveWorkspace = saveCurrentWorkspace.bind(this);
    this.delayLookup = delayLookup.bind(this);
    this.removeWindow = removeWindow.bind(this);
  }

  render() {
    const { windows } = this.props;

    return (
      <nav className="main-nav">
        <div className="fixed-left row-no-padding row">
          <div className="col-md-6 col-sm-6 col-xs-6">
            <img
              alt=""
              className="logo"
              src="images/responsive-viewer-logo.svg"
            />
          </div>

          <div className="col-md-6 col-sm-6 col-xs-6 row-no-padding row">
            {/* <div className="col-md-4 col-sm-4 col-xs-4">
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-4">
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </div> */}
            <div className="col-md-12 col-sm-12 col-xs-12">
              <button onClick={this.doRefresh}>
                <i
                  className={`${windows.windowsLoaded !== windows.windowsLoading ? 'spin' : ''} refresh-btn fa fa-refresh`}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="dynamic-middle">
          <input
            ref={(el) => { this.mainUrl = el; }}
            onChange={this.urlChange}
            defaultValue={windows.mainUrl}
            placeholder={getTranslation('main_nav', 'urlPlaceholder')}
          />
        </div>

        <div className="fixed-right">
          <button onClick={this.toggleMenu}>
            <i className="fa fa-ellipsis-v" aria-hidden="true" />
          </button>
        </div>

        <ul className={`${this.state.menuOpen ? 'open' : ''} settings-menu`}>
          <li className="rv-presets">
            <h3><TranslateText view="main_nav" item="workspaceTitlePlaceholder" /></h3>

            <ul>
              {this.props.windows.workspaces.length === 0 ? <TranslateText view="main_nav" item="workspaceEmptyPlaceholder" /> : ''}
              {this.props.windows.workspaces.map((workspace) => (
                <li key={workspace.name}>{workspace.name}</li>
              ))}
            </ul>
          </li>

          <li className="row row-no-padding">
            <div className="col-md-7 col-sm-7 col-xs-7">
              <input
                ref={(el) => { this.workspaceName = el; }}
                placeholder={getTranslation('main_nav', 'workspaceNamePlaceholder')}
              />
            </div>

            <div className="col-md-5 col-sm-5 col-xs-5">
              <button
                onClick={this.saveWorkspace}
                className="rv-button"
              >
                <TranslateText view="main_nav" item="saveBtnLabel" />
              </button>
            </div>
          </li>

          <li className="row row-no-padding">
            <div className="col-md-6 col-sm-6 col-xs-6">
              <button
                onClick={() => this.props.openModal('import')}
                className="rv-button"
              >
                <TranslateText view="main_nav" item="importBtnLabel" />
              </button>
            </div>

            <div className="col-md-6 col-sm-6 col-xs-6">
              <button
                onClick={() => this.props.openModal('export')}
                className="rv-button"
              >
                <TranslateText view="main_nav" item="exportBtnLabel" />
              </button>
            </div>
          </li>
        </ul>

        <i
          onMouseUp={this.removeWindoxw}
          className="remove-window fa fa-trash"
          aria-hidden="true"
        />

        <i
          onClick={this.props.newWindow}
          className="new-window fa fa-plus-circle"
          aria-hidden="true"
        />

        {this.props.globals.modalOpen ? <ModalWindow /> : ''}
      </nav>
    );
  }
}

function mapStateToProps({ ...state }) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateWindowUrl,
    newWindow,
    openModal,
    closeModal,
    saveWorkspace,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);
