
import React, { Component } from 'react'
import style from './style.css'
import DashboardMain from 'components/Dashboard/main'

class MainSection extends Component {
  render() {
    const {
      plugin
    } = this.props;
    return (
      <div className={style.main}>
        {plugin.component ?  <plugin.component /> : <DashboardMain />}
      </div>
    );
  }
}

export default MainSection
