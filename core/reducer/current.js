import { List, Map } from 'immutable';
import { onSuccess } from '../helper'

import {
  NETWORK_STATUS,
  SET_CURRENT_ARTICLE,
  SAVE_ARTICLE
} from "../constants"

const defaultState = Map({
  article:Map({}),
  status:NETWORK_STATUS.INIT
})

export default function(state=defaultState,action) {
  switch (action.type) {
    case SET_CURRENT_ARTICLE:
      return state.set('article',action.article)
    case SAVE_ARTICLE:
      const updateStatus = state.set("status",action.status);
      if(action.title)
        return updateStatus.set('article',state.get("article").set("title",action.title))
      if(action.editorState)
        return updateStatus.set('article',state.get("article").set("editorState",action.editorState))
    default:
      return state;
  }
}
