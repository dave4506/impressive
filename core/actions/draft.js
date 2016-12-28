import firebase from 'firebase'
import {List} from 'immutable'

import {
  PULL_DRAFT_IDS,
  NETWORK_STATUS
} from "../constants";

const database = firebase.database();

export const pullDraftIds = () => {
  return (dispatch,getState) => {
    const {profile} = getState();
    dispatch((()=>{type:PULL_DRAFT_IDS,status:NETWORK_STATUS.LOADING})())
    return database.ref(`/user_articles/${id}/`).once('value').then((snapshot)=>{
      const draftIds = List(snapshot.val());
      dispatch((()=>{type:PULL_DRAFT_IDS,status:NETWORK_STATUS.SUCCESS,draftIds})())
    }).catch((error)=>{
      dispatch((()=>{type:PULL_DRAFT_IDS,status:NETWORK_STATUS.ERROR,error})())
    })
  }
}
