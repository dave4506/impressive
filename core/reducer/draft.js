import { List,Map } from 'immutable';
import { onSuccess } from '../helper'

import {
  PULL_DRAFT_IDS,
  NETWORK_STATUS
} from "../constants"

const defaultState = Map(
  draftIds:List([]),
  status:NETWORK_STATUS.INIT
)

export default function(state=defaultState,action) {
  switch (action.type) {
    case PULL_DRAFT_IDS:
      const updatedStatus = state.set("status",action.status);
      return onSuccess(action) ? updatedStatus.set("draftIds",action.articleIds):updatedStatus;
    default:
      return state;
  }
}
