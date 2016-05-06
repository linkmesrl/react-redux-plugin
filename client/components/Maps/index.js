
import React, { Component } from 'react'
import style from './style.css'
import MapsMain from './main'


class Maps extends Component {
  renderPlugin = () => {
    this.props.actions.showPlugin(MapsMain);
  };
  render() {
    return (
      <li className={this.props.className} onClick={this.renderPlugin}>
        Maps
      </li>
    );
  }
}

export default Maps
