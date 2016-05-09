
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from 'components/Header'
import MainSection from 'components/MainSection'
import SideBar from 'components/SideBar'
import * as PluginActions from 'actions/plugins'
import style from './style.css'

class App extends Component {
  componentDidMount() {
    const { actions, children } = this.props
    // EXTERNAL_PLUGINS comes from webpack config

    const plugins = EXTERNAL_PLUGINS.map(plugin => {
      const waitForChunk = require('bundle?lazy!components/' + plugin + '/settings.js')
      return new Promise((resolve, reject) => waitForChunk((file) => {
        resolve(file.components)
      }));
    });
    Promise.all(plugins)
      .then(res => {
        const plugins = res.reduce((prev, current) => prev.concat(current), []);
        console.log(res, plugins);
        actions.addPlugins(plugins)
      })
    // console.log(plugins);
    // const plugins = EXTERNAL_PLUGINS.map(plugin => {
    //   const waitForChunk = require('bundle?lazy!components/' + plugin + '/settings.js')
    //   waitForChunk((file) => {
    //     const newPlugin = file.components
    //     actions.addPlugins(newPlugin)
    //     //console.log('newPlugin', newPlugin);
    //     // children = newPlugin.reduce((children, pluginComponent)=>{
    //     //   const component = pluginComponent.component
    //     //   , pathElement = pluginComponent.path.shift()
    //     //
    //     //   if(pathElement.length === 1){
    //     //     children[pathElement] = component
    //     //     return children
    //     //   }
    //     //
    //     //   const appendTo = children[pathElement]
    //     //   if(!appendTo) throw new Error('Invalid path')
    //     //
    //     //   //{C: C, path: ['b']}
    //     //   appendTo.appendChild(pluginComponent)
    //     //
    //     //   // è figlio
    //     //
    //     // }, children)
    //
    //
    //     // const sidebars = newPlugin.filter(el => el.path === 'menu');
    //     // actions.addPlugins(sidebars.map(el => el.component));
    //
    //     // const dashboards = newPlugin.filter(el => el.path === 'dashboard');
    //     // actions.addWidgets(dashboards.map(el => el.component));
    //
    //   });
    // });
    // const settings = require('components/Settings/settings.js');
    // console.log('APP PLUGINS', plugins);
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
    const { plugin, plugins, actions, children, widgets } = this.props
    console.log('App render', plugins, plugin);
    return (
      <div className={style.container}>
        <button
          className={style.button}
          onClick={this.addPluginRuntime}>Add Order</button>
        <Header />
        {
          plugins.files.length > 0 &&
            <div className={style.mainContainer}>
              <SideBar plugins={plugins} actions={actions} />
              <MainSection />
            </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    plugins: state.plugins,
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
)(App)
