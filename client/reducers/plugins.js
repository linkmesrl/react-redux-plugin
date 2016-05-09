
import { handleActions } from 'redux-actions'

const initialState = {
  files: []
}

export default handleActions({
  'add plugins' (state, action) {
    return {
      ...state,
      files: [
        ...state.files,
        ...action.payload
      ],
    }
  },
  'add components to area' (state, action) {
    return {
      ...state,
      ...action.payload
    }
  }
}, initialState)
