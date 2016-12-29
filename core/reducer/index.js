import { combineReducers } from 'redux-immutable';

import ui from './ui'
import user from './user'

const reducer = combineReducers({
  ui,
  user
})

export default reducer
