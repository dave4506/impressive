import { List, Map } from 'immutable';
import { onSuccess } from '../helper'

import {
  NETWORK_STATUS,
  SET_CURRENT_ARTICLE
} from "../constants"

const defaultState = Map({
  currentArticle:Map({}),
  currentDraft:Map({}),
  editable:false,
  status:NETWORK_STATUS.INIT
})

export default function(state=defaultState,action) {
  switch (action.type) {
    case SET_CURRENT_ARTICLE:
      const currentArticleSetted = state.set('currentArticle',action.article)
      const currentEdit = state.set('editable',action.editable)
      return currentEdit.set('currentDraft',action.draft)
    default:
      return state;
  }
}
