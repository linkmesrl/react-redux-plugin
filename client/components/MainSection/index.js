
import React, { Component } from 'react'
import style from './style.css'


class MainSection extends Component {
  render() {
    const {
      plugin
    } = this.props;
    return (
      <div className={style.main}>
        {
          Object.keys(plugin).length > 0 && JSON.stringify(plugin) !== JSON.stringify({})
            ?  plugin
            : <h1>Dashboard</h1>
        }
      </div>
    );
  }
}

export default MainSection
