import { combineReducers } from 'redux-immutable';

import ui from './ui'
import user from './user'
import profile from './profile'

const reducer = combineReducers({
  ui,
  user,
  profile
})

export default reducer
