
import { handleActions } from 'redux-actions'

const initialState = {}

export default handleActions({
  'show plugin' (state, action) {
    return {
      ...action.payload
    }
  },
}, initialState)
