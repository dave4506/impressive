import firebase from 'firebase'
import {List} from 'immutable'

import {
  PULL_ARTICLE_IDS,
  NETWORK_STATUS
} from "../constants";

const database = firebase.database();

export const pullArticleIds = () => {
  return (dispatch,getState) => {
    const {profile} = getState();
    dispatch((()=>{type:PULL_ARTICLE_IDS,status:NETWORK_STATUS.LOADING})())
    return database.ref(`/user_articles/${id}/`).once('value').then((snapshot)=>{
      const articleIds = List(snapshot.val());
      dispatch((()=>{type:PULL_ARTICLE_IDS,status:NETWORK_STATUS.SUCCESS,articleIds})())
    }).catch((error)=>{
      dispatch((()=>{type:PULL_ARTICLE_IDS,status:NETWORK_STATUS.ERROR,error})())
    })
  }
}
