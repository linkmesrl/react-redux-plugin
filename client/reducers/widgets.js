
import { handleActions } from 'redux-actions'

const initialState = []

export default handleActions({
  'add widgets' (state, action) {
    return [...state, ...action.payload]
  },
}, initialState)
