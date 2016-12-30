import { Map } from 'immutable';
import { onSuccess } from '../helper'

import {
  PULL_DRAFTS,
  NETWORK_STATUS
} from "../constants"

const defaultState = Map({
  drafts:Map({}),
  status:NETWORK_STATUS.INIT
})

export default function(state=defaultState,action) {
  switch (action.type) {
    case PULL_DRAFTS:
      const updatedStatus = state.set("status",action.status);
      return onSuccess(action) ? updatedStatus.set("drafts",action.drafts):updatedStatus;
    default:
      return state;
  }
}
