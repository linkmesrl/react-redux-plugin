
import { handleActions } from 'redux-actions'

const initialState = []

export default handleActions({
  'add plugins' (state, action) {
    return [...state, ...action.payload]
  },
}, initialState)
