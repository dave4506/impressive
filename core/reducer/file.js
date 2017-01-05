import { List, Map } from 'immutable';
import { onSuccess } from '../helper'

import {
  NETWORK_STATUS,
  EDITOR_STATE_FILE_UPLOAD,
  EDITOR_STATE_FILE_PREVIEW
} from "../constants"

const defaultState = Map({
  fileStatus:Map({})
})

export default function(state=defaultState,action) {
  const {blockIndex,fileHash} = action;
  switch (action.type) {
    case EDITOR_STATE_FILE_UPLOAD:
      const {loading,status} = action;
      var fileStatus = state.get("fileStatus").get(blockIndex) || {};
      fileStatus[fileHash] = Object.assign({},fileStatus[fileHash],{blockIndex,status,loading})
      return state.set("fileStatus",state.get("fileStatus").set(blockIndex,fileStatus));
    case EDITOR_STATE_FILE_PREVIEW:
      const {src} = action;
      var fileStatus = state.get("fileStatus").get(blockIndex) || {};
      fileStatus[fileHash] = Object.assign({},fileStatus[fileHash],{src})
      return state.set("fileStatus",state.get("fileStatus").set(blockIndex,fileStatus));
    default:
      return state;
  }
}
