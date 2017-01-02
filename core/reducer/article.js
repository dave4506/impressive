import { List,Map } from 'immutable';
import { onSuccess } from '../helper'

import {
  NETWORK_STATUS,
  PULL_ARTICLES
} from "../constants"

const defaultState = Map({
  articles:Map({}),
  status:NETWORK_STATUS.INIT,
  articleStatus:NETWORK_STATUS.INIT
})

export default function(state=defaultState,action) {
  switch (action.type) {
    case PULL_ARTICLES:
      const updatedArticlesStatus = state.set("status",action.status);
      return onSuccess(action) ? updatedArticlesStatus.set("articles",action.articles):updatedArticlesStatus;
    default:
      return state;
  }
}
