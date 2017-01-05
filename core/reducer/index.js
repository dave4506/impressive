import { combineReducers } from 'redux-immutable';

import ui from './ui'
import user from './user'
import profile from './profile'
import current from './current'
import draft from './draft'
import article from './article'
import file from './file'

const reducer = combineReducers({
  ui,
  user,
  profile,
  current,
  draft,
  article,
  file
})

export default reducer
