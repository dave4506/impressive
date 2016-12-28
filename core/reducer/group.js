import { Map } from 'immutable';
import { onSuccess } from '../helper'

import {
  PULL_GROUPS,
  NETWORK_STATUS
} from "../constants"

const defaultState = Map(
  groups:Map({}),
  status:NETWORK_STATUS.INIT
)

export default function(state=defaultState,action) {
  switch (action.type) {
    case PULL_GROUPS:
      const updatedStatus = state.set("status",action.status);
      return onSuccess(action) ? updatedStatus.set("groups",action.groups):updatedStatus;
    default:
      return state;
  }
}
