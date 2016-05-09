
import React, { Component } from 'react'
import style from './style.css'
import Dashboard from 'components/Dashboard'

class SideBar extends Component {
  renderPlugins = () => {
    return this.props.plugins.map((Component, i) => {
      return <Component key={i} className={style.li} actions={this.props.actions} />;
    })
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

export default SideBar
