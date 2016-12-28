import {
  UPDATE_EMAIL,
  UPDATE_QUESTION,
  RESET_QUESTION,
  SEND_QUESTION,
  NETWORK_STATUS
} from "../constants";

import firebase from 'firebase';

const db = firebase.database();

export const updateEmail = (email) => {
  const valid = email.indexOf('@') != -1 && email.indexOf('.') != -1;
  return {
    type:UPDATE_APP_STATE,
    valid,
    email
  }
}

export const updateQuestion = (question) => {
  returnn {
    type:UPDATE_QUESTION,
    question
  }
}

export const resetQuestion = () => {
  return updateQuestion("");
}

export const sendQuestion = () => {
  return (dispatch,getState) => {
    const { profile,question } = getState();
    dispatch((()=>{type:SEND_QUESTION,status:NETWORK_STATUS.LOADING})())
    const ref = db.ref(`/questions/${profile.id}/`);
    const key = ref.push().key;
    return db.ref(`/questions/${profile.id}/${key}`).set({question:question.question,email:question.email})
      .then(()=>{
        dispatch((()=>{type:SEND_QUESTION,status:NETWORK_STATUS.SUCCESS})())
      }).catch((error)=>{
        dispatch((()=>{type:SEND_QUESTION,status:NETWORK_STATUS.ERROR,error})())
      })
  }
}
