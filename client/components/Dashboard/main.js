
import React, { Component } from 'react'
import style from './style.css'


class DashboardMain extends Component {
  renderWidgets = () => {
    const {
      widgets
    } = this.props;
    console.log(widgets);
    const widgetsComponents = widgets.map((Widget, i) => <Widget key={i} /> )
    return (
      <div>
        {
          widgetsComponents
        }
      </div>
    );
  };
  render() {
    return (
      <div>
        <h1>
          Dashboard Main
        </h1>
        {this.renderWidgets()}
      </div>
    );
  }
}

export default DashboardMain
