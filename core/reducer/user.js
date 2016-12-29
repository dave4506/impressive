import { Map } from 'immutable';
import { onSuccess } from '../helper'

import {
  NETWORK_STATUS,
  LOG_IN,
  LOG_OUT,
  USER_STATUS_CHANGE
} from "../constants"

const defaultState = Map({
  user:"",
  logInStatus:NETWORK_STATUS.INIT,
  logOutStatus:NETWORK_STATUS.INIT,
  userUpdateStatus:NETWORK_STATUS.INIT
})

export default function(state=defaultState,action) {
  switch (action.type) {
    case LOG_OUT:
      const updatedLogOutStatus = state.set("logOutStatus",action.status);
      return  onSuccess(action) ? updatedLogOutStatus.set("uid",""):updatedLogOutStatus;
    case LOG_IN:
      const updatedLogInStatus = state.set("logInStatus",action.status);
      return  onSuccess(action) ? updatedLogInStatus.set("uid",action.user.uid):updatedLogInStatus;
    case USER_STATUS_CHANGE:
      const updatedUserStatus = state.set("userUpdateStatus",action.status);
      return  onSuccess(action) ? updatedUserStatus.set("uid",action.user.uid):updatedUserStatus;
    default:
      return state;
  }
}
