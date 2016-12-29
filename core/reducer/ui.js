import {Map} from 'immutable';

import {
  APP_STATE,
  NETWORK_STATUS,
  UPDATE_APP_STATE,
  CREATE_DRAFT,
  SAVE_DRAFT,
  MOVE_GROUP,
  PUBLISH_DRAFT,
  DELETE_DRAFT,
  CREATE_ARTICLE,
  DELETE_ARTICLE
} from "../constants"

const defaultState = Map({
  appState: APP_STATE.INIT,
  createDraft:NETWORK_STATUS.INIT,
  saveDraft:NETWORK_STATUS.INIT,
  moveGroup:NETWORK_STATUS.INIT,
  publishDraft:NETWORK_STATUS.INIT,
  deleteDraft:NETWORK_STATUS.INIT,
  createArticle:NETWORK_STATUS.INIT,
  deleteArticle:NETWORK_STATUS.INIT,
})

const actionToState = Map({
  CREATE_DRAFT:"createDraft",
  SAVE_DRAFT:"saveDraft",
  MOVE_GROUP:"moveGroup",
  PUBLISH_DRAFT:"publishDraft",
  DELETE_DRAFT:"deleteDraft",
  CREATE_ARTICLE:"createArticle",
  DELETE_ARTICLE:"deleteArticle"
})

export default function(state=defaultState,action) {
  switch (action.type) {
    case UPDATE_APP_STATE:
      if(APP_STATE[action.appState])
        return state.set("appState",action.appState)
    case CREATE_DRAFT:
    case SAVE_DRAFT:
    case MOVE_GROUP:
    case PUBLISH_DRAFT:
    case DELETE_DRAFT:
    case CREATE_ARTICLE:
    case DELETE_ARTICLE:
      return state.set(actionToState.get(action.type),action.status)
    default:
      return state;
  }
}
