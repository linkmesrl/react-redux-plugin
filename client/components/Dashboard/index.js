
import React, { Component } from 'react'
import style from './style.css'
import DashboardMain from './main'


class Dashboard extends Component {
  renderPlugin = () => {
    this.props.actions.showPlugin(DashboardMain);
  };
  render() {
    return (
      <li className={this.props.className} onClick={this.renderPlugin}>
        Dashboard
      </li>
    );
  }
}

export default Dashboard
