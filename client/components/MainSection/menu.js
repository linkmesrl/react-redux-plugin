
import React, { Component } from 'react'
import style from './style.css'
import MainSection from './main'


class Dashboard extends Component {
  renderPlugin = () => {
    this.props.actions.showPlugin(MainSection);
  };
  render() {
    return (
      <li className={this.props.className} onClick={this.renderPlugin}>
        Main
      </li>
    );
  }
}

export default Dashboard
