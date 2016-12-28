import {Map} from 'immutable';
import { onSuccess } from '../helper'

import {
  PULL_PROFILE,
  EDIT_PROFILE,
  SAVE_PROFILE,
  NETWORK_STATUS
} from "../constants"

const defaultState = Map({
  name:"",
  subtext:"",
  link:"",
  shareLink:"",
  status:NETWORK_STATUS.INIT,
  saveStatus:NETWORK_STATUS.INIT
})

export default function(state=defaultState,action) {
  switch (action.type) {
    case PULL_PROFILE:
      const updatedStatus = state.set("status",action.status);
      return  onSuccess(action) ? updatedStatus.merge(action.profile):updatedStatus;
    case EDIT_PROFILE:
      return state.merge(action.profile);
    case SAVE_PROFILE:
      return state.set("saveStatus",action.status);
    default:
      return state;
  }
}
