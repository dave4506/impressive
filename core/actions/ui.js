import {
  UPDATE_APP_STATE
} from "../constants";

export const updateAppState = (newAppState) => {
  return {
    type:UPDATE_APP_STATE,
    appState:newAppState
  }
}
