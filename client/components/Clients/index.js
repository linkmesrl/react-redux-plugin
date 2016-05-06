
import React, { Component } from 'react'
import style from './style.css'
import ClientsMain from './main'


class Clients extends Component {
  renderPlugin = () => {
    this.props.actions.showPlugin(<ClientsMain />);
  };
  render() {
    return (
      <li className={this.props.className} onClick={this.renderPlugin}>
        Clients
      </li>
    );
  }
}

export default Clients
