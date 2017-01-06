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
  switch (action.type) {
    case EDITOR_STATE_FILE_UPLOAD:
      var fileStatus = state.get("fileStatus").get(action.index) || {};
      fileStatus[action.fileHash] = Object.assign({},fileStatus[action.fileHash],{status:action.status,loading:action.loading})
      return state.set("fileStatus",state.get("fileStatus").set(action.index,fileStatus));
    case EDITOR_STATE_FILE_PREVIEW:
      var fileStatusSrc = state.get("fileStatus").get(action.index) || {};
      fileStatusSrc[action.fileHash] = Object.assign({},fileStatusSrc[action.fileHash],{src:action.src})
      return state.set("fileStatus",state.get("fileStatus").set(action.index,fileStatusSrc));
    default:
      return state;
  }
}
