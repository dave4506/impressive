import { List, Map } from 'immutable';
import { onSuccess } from '../helper'

import {
  NETWORK_STATUS,
  SET_CURRENT_ARTICLE
} from "../constants"

const defaultState = Map({
  articleId:"",
  status:NETWORK_STATUS.INIT
})

export default function(state=defaultState,action) {
  switch (action.type) {
    case SET_CURRENT_ARTICLE:
      return state.set('articleId',action.articleId)
    default:
      return state;
  }
}
