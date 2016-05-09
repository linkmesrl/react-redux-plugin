
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as PluginActions from 'actions/plugins'

import style from './style.css'
import DashboardMain from 'components/Dashboard/main'

class MainSection extends Component {
  render() {
    const {
      plugin
    } = this.props;
    console.log('PLUGIN', plugin);
    return (
      <div className={style.main}>
        {
          plugin.component ? <plugin.component /> : <DashboardMain />
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
