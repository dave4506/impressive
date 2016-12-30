import firebase from 'firebase'
import {List} from 'immutable'
import {simpleAction} from '../helper'
import {
  PULL_ARTICLES,
  PULL_DRAFTS,
  NETWORK_STATUS
} from "../constants";

import {
  pullPromises,
  convertToObject
} from "../helper"

const database = firebase.database();

const pullArticleIds = (id) => {
  return database.ref(`/user_articles/${id}/`).once('value').then((snapshot)=>{
    return Object.keys(snapshot.val());
  })
}

const extractDraftIds = (articles,draftIds=[],key="") => {
  if(articles.length == 0)
    return draftIds
  else {
    const article = articles.pop();
    draftIds.push(article[key])
    return extractDraftIds(articles,draftIds,key)
  }
}

export const pullArticles = () => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:PULL_ARTICLES,status:NETWORK_STATUS.LOADING}));
    const user = getState().get("user");
    const appState = getState().get("ui").get("appState");
    var extractKey = "";
    if(appState == "VIEW" || appState == "EDIT")
      extractKey="currentDraft";
    else
      extractKey="publicDraft";
    return pullArticleIds(user.get("uid"))
      .then(ids=>{
        return Promise.all(pullPromises('/articles/',ids))
      })
      .then((articles)=>{
        dispatch(simpleAction({type:PULL_ARTICLES,status:NETWORK_STATUS.SUCCESS,articles:convertToObject(articles,"uid")}))
        dispatch(simpleAction({type:PULL_DRAFTS,status:NETWORK_STATUS.LOADING}));
        return articles;
      })
      .then((a) => {
        return extractDraftIds(a,[],extractKey)})
      .then(ids=>{
        return Promise.all(pullPromises('/drafts/',ids))
      })
      .then(drafts=>{
        dispatch(simpleAction({type:PULL_DRAFTS,status:NETWORK_STATUS.SUCCESS,drafts:convertToObject(drafts,"uid")}))
        return drafts;
      })
      .catch((error)=>{
        dispatch(simpleAction({type:PULL_ARTICLES,status:NETWORK_STATUS.ERROR,error}))
        dispatch(simpleAction({type:PULL_DRAFTS,status:NETWORK_STATUS.ERROR,error}))
      })
  }
}
