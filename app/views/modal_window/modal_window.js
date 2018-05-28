import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeModal } from '../../actions';

import ImportWorkspace from './import_workspace/import_workspace';
import ExportWorkspace from './export_workspace/export_workspace';

import './modal_window.scss';

class ModalWindow extends Component {
  stopPropogation(event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  render() {
    const { globals } = this.props;

    return (
      <section // eslint-disable-line
        onClick={() => this.props.closeModal()}
        className="modal-window-bg"
      >
        <div // eslint-disable-line
          onClick={(event) => this.stopPropogation(event)}
          className={`${this.props.globals.modalOpen === 'closing' ? 'closing' : ''} modal-window`}
        >
          {globals.modalType === 'import' ? <ImportWorkspace /> : ''}
          {globals.modalType === 'export' ? <ExportWorkspace /> : ''}

          <button
            onClick={() => this.props.closeModal()}
            className="modal-toggle"
          >
            <i className="fa fa-times-circle" aria-hidden="true" />
          </button>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ ...state }) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);
