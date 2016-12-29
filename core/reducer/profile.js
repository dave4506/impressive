import {Map} from 'immutable';
import { onSuccess } from '../helper'

import {
  PULL_PROFILE,
  EDIT_PROFILE,
  SAVE_PROFILE,
  NETWORK_STATUS,
  LOG_OUT,
  LOG_IN,
  USER_STATUS_CHANGE
} from "../constants"

const defaultState = Map({
  displayName:"",
  subtext:"",
  link:"",
  shareLink:"",
  photoURL:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fdefault-profile-pic.png?alt=media&token=3c36be23-f82e-45d9-aaec-6c4d66fbc16a",
  email:"",
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
