
import React, { Component } from 'react'
import style from './style.css'


class MainSection extends Component {
  render() {
    const {
      plugin
    } = this.props;
    return (
      <div className={style.main}>
        {plugin.component ?  <plugin.component /> : <h1>Dashboard</h1>}
      </div>
    );
  }
}

export default MainSection
