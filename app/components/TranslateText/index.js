import { Component } from 'react';
import { connect } from 'react-redux';

import strings from '../../strings';

class TranslateText extends Component {
  render() {
    const {
      language,
      view,
      item,
    } = this.props;

    return strings[language][view][item];
  }
}

function mapStateToProps(state) {
  return {
    language: state.globals.language,
  };
}

export default connect(mapStateToProps, null)(TranslateText);
