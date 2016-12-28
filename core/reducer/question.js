import {Map} from 'immutable';
import { onSuccess } from '../helper'

import {
  QUESTION_STATUS,
  UPDATE_EMAIL,
  UPDATE_QUESTION,
  SEND_QUESTION
} from "../constants"

const defaultState = Map({
  email: null,
  question: "",
  status:QUESTION_STATUS.INIT
})

export default function(state=defaultState,action) {
  switch (action.type) {
    case UPDATE_QUESTION:
      const newQuestionState = state.set('question',action.question);
      return newQuestionState.set('status',QUESTION_STATUS.QUESTIONING);
    case UPDATE_EMAIL:
      const newEmailState = state.set('email',action.email);
      return newQuestionState.set('status',(action.valid ? QUESTION_STATUS.EMAIL:QUESTION_STATUS:INVALIDEMAIL));
    case SEND_QUESTION:
      const updatedSendState = state.set("status",action.status);
      return onSuccess(action) ? updatedSendState.set(question,""):updatedSendState;
    default:
      return state;
  }
}
