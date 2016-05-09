
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
    console.log('DashboardMain componentDidMount', plugins.files);
    const sidebars = plugins.files.filter(el => el.path === 'dashboard');
    this.props.actions.addComponentsToArea({ dashboard: sidebars.map(el => el.component) });
  }

  renderWidgets = () => {
    const {
      plugins
    } = this.props;
    const widgets = plugins.dashboard || [];
    console.log('WIDGETS', widgets);
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
