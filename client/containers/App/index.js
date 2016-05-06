
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from 'components/Header'
import MainSection from 'components/MainSection'
import SideBar from 'components/SideBar'
import * as TodoActions from 'actions/todos'
import style from './style.css'

class App extends Component {
  componentDidMount() {
    const { actions, children } = this.props
    // EXTERNAL_PLUGINS comes from webpack config
    const plugins = EXTERNAL_PLUGINS.map(plugin => {
      const waitForChunk = require('bundle?lazy!components/' + plugin + '/index.js')
      waitForChunk((file) => {
        const newPlugin = file.default
        actions.addPlugins([newPlugin]);
      });
    });
  }
  addPluginRuntime = () => {
    const { actions, children } = this.props
    const plugin = 'Orders';
    const waitForChunk = require('bundle?lazy!./../../../plugins/Orders/index.js')

    waitForChunk((file) => {
      const newPlugin = file.default
      actions.addPlugins([newPlugin]);
    });

  }
  render() {
    const { plugin, plugins, actions, children } = this.props
    console.log(plugins);
    return (
      <div className={style.container}>
        <button
          className={style.button}
          onClick={this.addPluginRuntime}>Add Order</button>
        <Header />
        <div className={style.mainContainer}>
          <SideBar plugins={plugins} actions={actions} />
          <MainSection plugin={plugin} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    plugins: state.plugins,
    plugin: state.plugin
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
