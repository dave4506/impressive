import { List, Map } from 'immutable';
import { onSuccess } from '../helper'

import {
  NETWORK_STATUS,
  SET_CURRENT_ARTICLE,
  SAVE_ARTICLE,
  EDITOR_STATE_FILE_UPLOAD
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
    case EDITOR_STATE_FILE_UPLOAD:
      var block = state.get("article").get("editorState")[action.index];
      if(block.fileStatus == null) block.fileStatus = {};
      block.fileStatus[action.fileHash] = action.status;
      if(onSuccess(action))
        block.props = Object.assign({},block.props,action.newBlockProps)
      var newEditorState = state.get("article").get("editorState");
      newEditorState[action.index] = block;
      return state.set("article",state.get("article").set("editorState",newEditorState));
    default:
      return state;
  }
}
