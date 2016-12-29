import firebase from 'firebase'
import {List} from 'immutable'

import {
  PULL_ARTICLES,
  PULL_DRAFTS
  NETWORK_STATUS
} from "../constants";

import {
  pullPromises,
  convertToObject
} from "../helper"

const database = firebase.database();

const pullArticleIds = (id) => {
  return database.ref(`/user_articles/${id}/`).once('value').then((snapshot)=>{
    const articleIds = List(snapshot.val());
  })
}

const extractDraftIds = (articles,draftIds=[]) => {
  if(articles.length == 0)
    return draftIds
  else {
    const {currentDraft,publicDraft} = articles.pop();
    return extractDraftIds(articles, draftIds.append( currentDraft == publicDraft ? [currentDraft]:[currentDraft,publicDraft]))
  }
}

export const pullArticles = () => {
  return (dispatch,getState) => {
    dispatch((()=>{type:PULL_ARTICLES,status:NETWORK_STATUS.LOADING})());
    const {profile} = getState();
    return pullArticleIds(profile.id)
      .then(ids=>{
        return Promise.all(pullPromises('/articles/',ids))
      })
      .then((articles)=>{
        dispatch((()=>{type:PULL_ARTICLES,status:NETWORK_STATUS.SUCCESS,articles:convertToObject(articles,"id")})())
        dispatch((()=>{type:PULL_DRAFTS,status:NETWORK_STATUS.LOADING})());
        return articles;
      })
      .then(extractDraftIds)
      .then(ids=>{
        return Promise.all(pullPromises('/drafts/',ids))
      })
      .then(drafts=>{
        dispatch((()=>{type:PULL_DRAFTS,status:NETWORK_STATUS.SUCCESS,drafts:convertToObject(drafts,"id")})())
      })
      .catch((error)=>{
        dispatch((()=>{type:PULL_ARTICLES,status:NETWORK_STATUS.ERROR,error})())
        dispatch((()=>{type:PULL_DRAFTS,status:NETWORK_STATUS.ERROR,error})())
      })
  }
}
