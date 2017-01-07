import { Map } from 'immutable';
import { onSuccess } from '../helper'

import {
  ICON_CAT_LOAD,
  ICON_LOAD,
  NETWORK_STATUS
} from "../constants"

const defaultState = Map({
  cat:Map({}),
  icons:Map({}),
  catStatus:NETWORK_STATUS.INIT,
  iconsStatus:NETWORK_STATUS.INIT
})

export default function(state=defaultState,action) {
  switch (action.type) {
    case ICON_CAT_LOAD:
      const updatedStatus = state.set("catStatus",action.status);
      return onSuccess(action) ? updatedStatus.set("cat",action.cat):updatedStatus;
      case ICON_LOAD:
        const updatedIconsStatus = state.set("iconsStatus",action.status);
        const icons = state.get("icons");
        return onSuccess(action) ? updatedIconsStatus.set("icons",icons.set(action.key,action.urls)):updatedIconsStatus;
    default:
      return state;
  }
}
