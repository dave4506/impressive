import {
  UPDATE_APP_STATE
} from "../constants";

import {handleUser} from './user'
import {simpleAction} from '../helper'
import firebase from 'firebase';

export const updateAppState = (newAppState) => {
  return (dispatch) => {
    dispatch(simpleAction({
      type:UPDATE_APP_STATE,
      appState:newAppState
    }));
  }
}
