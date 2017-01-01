import firebase from 'firebase'
import {Map} from 'immutable'
import history from '../history';
import {switchCurrentToNext} from './current';
import {
  PULL_ARTICLES,
  PULL_DRAFTS,
  NETWORK_STATUS
} from "../constants";

import {
  pullPromises,
  convertToObject,
  simpleAction
} from "../helper"

const database = firebase.database();

const pullArticleIds = (id) => {
  return database.ref(`/user_articles/${id}/`).once('value').then((snapshot)=>{
    return Object.keys(snapshot.val() || {});
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

export const pullArticlesAndSetCurrent = () => {
  return (dispatch,getState) => {
    return pullArticles()(dispatch,getState).then(()=>{
      return switchCurrentToNext(dispatch,getState)
    })
  }
}

export const pullArticles = () => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:PULL_ARTICLES,status:NETWORK_STATUS.LOADING}));
    const userId = history.getCurrentLocation().query.uid;
    const appState = getState().get("ui").get("appState");
    var extractKey = "";
    if(appState == "VIEW" || appState == "EDIT")
      extractKey="currentDraft";
    else
      extractKey="publicDraft";
    return pullArticleIds(userId)
      .then(ids=>{
        return Promise.all(pullPromises('/articles/',ids))
      })
      .then((articles)=>{
        dispatch(simpleAction({type:PULL_ARTICLES,status:NETWORK_STATUS.SUCCESS,articles:convertToObject(articles,"uid")}))
        return articles
      })
  }
}
