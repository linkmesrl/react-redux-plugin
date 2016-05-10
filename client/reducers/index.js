
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import plugins from './plugins'
import plugin from './plugin'

export default combineReducers({
  routing,
  plugins,
  plugin
})
