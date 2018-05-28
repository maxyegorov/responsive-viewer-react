import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  closeModal,
  updateWindows,
} from '../../../actions';
import getTranslation from '../../../common/getTranslation';

import TranslateText from '../../../components/TranslateText';

import './import_workspace.scss';

class ImportWorkspace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };

    this.contentChange = this.contentChange.bind(this);
    this.importWorkspace = this.importWorkspace.bind(this);
  }

  contentChange() {
    if (this.state.error) {
      try {
        const workspaceContent = JSON.parse(this.workspaceContent.value); // eslint-disable-line
        this.setState({ error: '' });
      } catch (ex) {
        this.setState({ error: <TranslateText view="import_workspace" item="jsonError" /> });
      }
    }
  }

  importWorkspace() {
    let workspaceContent = this.workspaceContent.value;

    try {
      workspaceContent = JSON.parse(workspaceContent);
      this.props.updateWorkspaces(workspaceContent);
      this.props.closeModal();
    } catch (ex) {
      this.setState({ error: <TranslateText view="import_workspace" item="jsonError" /> });
    }
  }

  render() {
    return (
      <section className="import-workspace row">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <textarea
            ref={(el) => { this.workspaceContent = el; }}
            onChange={this.contentChange}
            className={`${this.state.error ? 'input-error-container' : ''}`}
            placeholder={getTranslation('import_workspace', 'importContentPlaceholder')}
          />
          {this.state.error ? <div className="input-error-message">{ this.state.error }</div> : ''}
        </div>

        <div className="col-md-3 col-sm-3 col-xs-2" />

        <div className="col-md-6 col-sm-6 col-xs-8">
          <button
            onClick={this.importWorkspace}
            className="rv-button"
          >
            <TranslateText view="import_workspace" item="importBtnLabel" />
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
  return bindActionCreators({
    closeModal,
    updateWindows,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportWorkspace);
