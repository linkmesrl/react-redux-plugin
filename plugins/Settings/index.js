
import React, { Component } from 'react'
import style from './style.css'
import SettingsMain from './main'

class Settings extends Component {
  renderPlugin = () => {
    console.log(SettingsMain);
    this.props.actions.showPlugin(SettingsMain);
  };
  render() {
    return (
      <li className={this.props.className} onClick={this.renderPlugin}>
        Settings
      </li>
    );
  }
}

export default Settings
