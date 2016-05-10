
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as PluginActions from 'actions/plugins'

import style from './style.css'


class DashboardMain extends Component {
  componentDidMount() {
    const {
      actions,
      plugins
    } = this.props;
    const dashboardWidgets = plugins.files.filter(el => el.path === 'dashboard');
    this.props.actions.addComponentsToArea({ dashboard: dashboardWidgets.map(el => el.component) });
  }
  componentWillUpdate(nextProps) {
    console.log('nextProps', nextProps.plugins);
    if (nextProps.plugins.files.length > this.props.plugins.files.length) {
      const dashboardWidgets = nextProps.plugins.files.filter(el => el.path === 'dashboard');
      nextProps.actions.addComponentsToArea({ dashboard: dashboardWidgets.map(el => el.component) });
    }
  }
  renderWidgets = () => {
    const {
      plugins
    } = this.props;
    const widgets = plugins.dashboard || [];
    const widgetsComponents = widgets.map((Widget, i) => <Widget key={i} /> )
    return (
      <div className={style.main}>
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


function mapStateToProps(state) {
  return {
    plugins: state.plugins,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PluginActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardMain)
