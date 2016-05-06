
import React, { Component } from 'react'
import style from './style.css'
import OrdersMain from './main'


class Orders extends Component {
  renderPlugin = () => {
    this.props.actions.showPlugin(<OrdersMain />);
  };
  render() {
    return (
      <li className={this.props.className} onClick={this.renderPlugin}>
        Orders
      </li>
    );
  }
}

export default Orders
