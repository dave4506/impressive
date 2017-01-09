import {Map} from 'immutable';

import {
  APP_STATE,
  NETWORK_STATUS,
  CREATE_ARTICLE,
  DELETE_ARTICLE,
  UPDATE_APP_STATE
} from "../constants"

const defaultState = Map({
  appState: APP_STATE.INIT,
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
    case CREATE_ARTICLE:
    case DELETE_ARTICLE:
      return state.set(actionToState.get(action.type),action.status)
    default:
      return state;
  }
}
