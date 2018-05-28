import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeModal } from '../../../actions';

import TranslateText from '../../../components/TranslateText';

class ExportWorkspace extends Component {
  getJsonString() {
    return JSON.stringify(this.props.windows.workspaces);
  }

  render() {
    return (
      <section className="import-workspace row">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <textarea defaultValue={this.getJsonString()} />
        </div>

        <div className="col-md-3 col-sm-3 col-xs-2" />

        <div className="col-md-6 col-sm-6 col-xs-8">
          <button
            onClick={() => this.props.closeModal()}
            className="rv-button"
          >
            <TranslateText view="export_workspace" item="btnLabel" />
          </button>
        </div>

        <div className="col-md-3 col-sm-3 col-xs-2" />
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

export default connect(mapStateToProps, mapDispatchToProps)(ExportWorkspace);
