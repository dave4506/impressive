import {Map} from 'immutable';

import {
  APP_STATE,
  UPDATE_APP_STATE
} from "../constants"

const defaultState = Map({
  appState: APP_STATE.INIT
})

export default function(state=defaultState,action) {
  switch (action.type) {
    case UPDATE_APP_STATE:
      if(APP_STATE.has(action.appState))
        return state.set({appState:action.appState})
    default:
      return state;
  }
}
