
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as PluginActions from 'actions/plugins'

import style from './style.css'
import Dashboard from 'components/Dashboard'

class SideBar extends Component {
  componentDidMount() {
    const {
      actions,
      plugins
    } = this.props;
    console.log('SideBar componentDidMount', plugins.files);
    const sidebars = plugins.files.filter(el => el.path === 'menu');
    this.props.actions.addComponentsToArea({ menu: sidebars.map(el => el.component) });
  }
  // shouldComponentUpdate(nextProps) {
  //   console.log('shouldComponentUpdate', this.props.plugins.files && nextProps.plugins.file.length !== this.props.plugins.file.length);
  //   return this.props.plugins.files && ;
  // }
  componentWillUpdate(nextProps) {
    if (nextProps.plugins.files.length > this.props.plugins.files.length) {
      const sidebars = nextProps.plugins.files.filter(el => el.path === 'menu');
      nextProps.actions.addComponentsToArea({ menu: sidebars.map(el => el.component) });
    }
  }
  renderPlugins = () => {
    console.log(this.props.plugins.menu);
    if (this.props.plugins.menu) {
      return this.props.plugins.menu.map((Component, i) => {
        return <Component key={i} className={style.li} actions={this.props.actions} />;
      })
    }
  };
  render() {
    return (
      <div className={style.main}>
        <ul className={style.ul}>
          <Dashboard className={style.li} actions={this.props.actions} />
          {this.renderPlugins()}
        </ul>
      </div>
    );
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
)(SideBar)
