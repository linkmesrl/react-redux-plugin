
import { createAction } from 'redux-actions'

export const addPlugins = createAction('add plugins')
export const addComponentsToArea = createAction('add components to area')
export const addWidgets = createAction('add widgets')
export const showPlugin = createAction('show plugin', component => ({ component }))
