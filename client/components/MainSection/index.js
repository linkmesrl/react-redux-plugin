
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as PluginActions from 'actions/plugins'
import Main from './main'

import style from './style.css'

class MainSection extends Component {
  render() {
    const {
      plugin
    } = this.props;
    return (
      <div className={style.main}>
        {
          plugin.component ? <plugin.component /> : <Main />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    plugin: state.plugin,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PluginActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSection)
