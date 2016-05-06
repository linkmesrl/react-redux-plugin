
import React, { Component } from 'react'
import style from './style.css'
import Settings from 'components/Settings'

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
          {this.renderPlugins()}
        </ul>
      </div>
    );
  }
}

export default SideBar
