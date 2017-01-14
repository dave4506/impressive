import firebase from 'firebase'
import {Map} from 'immutable'
import history from '../history';
import {setCurrent} from './current';
import {
  PULL_ARTICLES,
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

export const pullArticles = () => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:PULL_ARTICLES,status:NETWORK_STATUS.LOADING}));
    const userId = history.getCurrentLocation().query.uid;
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

export const pullArticle = (artId) => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:PULL_ARTICLES,status:NETWORK_STATUS.LOADING}));
    const articleId = artId || history.getCurrentLocation().query.aid;
    const appState = getState().get("ui").get("appState");
    var extractKey = "";
    return database.ref('/shorten/'+articleId).once('value').then((snapshot)=>{
      return database.ref('/articles/'+snapshot.val()).once('value')
    }).then(snapshot=>{
      var obj = {};
      obj[snapshot.key] =  Map(Object.assign({uid:snapshot.key},snapshot.val()));
      return {articles:Map(obj),key:snapshot.key}
    })
    .then(({articles,key})=>{
      dispatch(simpleAction({type:PULL_ARTICLES,status:NETWORK_STATUS.SUCCESS,articles:articles}))
      dispatch(setCurrent(key));
      return articles
    })
  }
}
