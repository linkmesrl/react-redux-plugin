
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import plugins from './plugins'
import plugin from './plugin'
import widgets from './widgets'

export default combineReducers({
  routing,
  plugins,
  plugin,
  widgets
})
