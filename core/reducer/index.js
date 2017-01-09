import { combineReducers } from 'redux-immutable';

import ui from './ui'
import user from './user'
import current from './current'
import article from './article'
import file from './file'
import icon from './icon'

const reducer = combineReducers({
  ui,
  user,
  current,
  article,
  file,
  icon
})

export default reducer
