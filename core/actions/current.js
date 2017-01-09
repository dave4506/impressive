import firebase from 'firebase'
import {List} from 'immutable'
import {pullArticles} from './article'
import {updateAppState} from './ui'
import {simpleAction} from '../helper'
import history from '../history'
import shortid from 'shortid';

import {
  createEditorState,
} from 'medium-draft';

import {convertToRaw} from 'draft-js';
import {
  SET_CURRENT_ARTICLE,
  NETWORK_STATUS,
  CREATE_ARTICLE,
  SAVE_ARTICLE,
  DELETE_ARTICLE,
  GROUP_KEYS
} from "../constants";

import {defaultBlockProps} from '../../pages/blocks'

const database = firebase.database();

const defaultEditorState = () => {
  return [{type:"PROFILE",props:defaultBlockProps("PROFILE"),hash:shortid.generate()}]
}

const updateLocalArticles = (dispatch,getState) => {
  return pullArticles()(dispatch,getState)
}

export const setCurrent = (id) => {
  return (dispatch,getState) => {
    dispatch(simpleAction({
      type:SET_CURRENT_ARTICLE,
      article:getState().get("article").get("articles").get(id)
    }))
  }
}

export const saveArticleTitle = (title) => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:SAVE_ARTICLE,status:NETWORK_STATUS.LOADING,title}));
    var updates = {};
    const articleId = getState().get("current").get("article").get("uid")
    updates[`articles/${articleId}/title`] = title
    return database.ref().update(updates).then(()=>{
      dispatch(simpleAction({type:SAVE_ARTICLE,status:NETWORK_STATUS.SUCCESS,title}));
    }).catch((error)=>{
      dispatch(simpleAction({type:SAVE_ARTICLE,status:NETWORK_STATUS.ERROR,error}))
    })
  }
}

export const saveArticlePublic = (status) => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:SAVE_ARTICLE,status:NETWORK_STATUS.LOADING,public:status}));
    var updates = {};
    const articleId = getState().get("current").get("article").get("uid")
    updates[`articles/${articleId}/public`] = status
    return database.ref().update(updates).then(()=>{
      dispatch(simpleAction({type:SAVE_ARTICLE,status:NETWORK_STATUS.SUCCESS,public:status}));
    }).catch((error)=>{
      dispatch(simpleAction({type:SAVE_ARTICLE,status:NETWORK_STATUS.ERROR,error}))
    })
  }
}

export const saveArticleState = (editorState) => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:SAVE_ARTICLE,status:NETWORK_STATUS.LOADING,editorState}));
    var updates = {};
    const articleId = getState().get("current").get("article").get("uid");
    const newEditorState = (editorState.length == 0 ? defaultEditorState():editorState);
    updates[`articles/${articleId}/editorState`] = newEditorState;
    return database.ref().update(updates).then(()=>{
      dispatch(simpleAction({type:SAVE_ARTICLE,status:NETWORK_STATUS.SUCCESS,editorState:newEditorState}));
    }).catch((error)=>{
      dispatch(simpleAction({type:SAVE_ARTICLE,status:NETWORK_STATUS.ERROR,error}))
    })
  }
}

export const createArticle = (title) => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:CREATE_ARTICLE,status:NETWORK_STATUS.LOADING}));
    var updates = {};
    const uid = history.getCurrentLocation().query.uid;
    const articleId = database.ref('/articles').push().key
    const shortId = shortid.generate()
    updates[`user_articles/${uid}/${articleId}`] = true;
    updates[`articles/${articleId}/`] = {author:uid,views:0,title,shortId,editorState:defaultEditorState(),public:false};
    updates[`shorten/${shortId}`] = articleId
    return database.ref().update(updates).then(()=>{
      dispatch(simpleAction({type:CREATE_ARTICLE,status:NETWORK_STATUS.SUCCESS}));
      history.push(`/edit?uid=${uid}&aid=${shortId}`)
    }).catch((error)=>{
      dispatch(simpleAction({type:CREATE_ARTICLE,status:NETWORK_STATUS.ERROR,error}))
    })
  }
}

export const deleteArticle = (article) => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:DELETE_ARTICLE,status:NETWORK_STATUS.LOADING}));
    var updates = {};
    const uid = history.getCurrentLocation().query.uid;
    const current = getState().get("current");
    updates[`user_articles/${uid}/${article.uid}`] = null;
    updates[`articles/${article.uid}/`] = null;
    updates[`shorten/${article.shortId}`] = null;
    return database.ref().update(updates).then(()=>{
      dispatch(simpleAction({type:DELETE_ARTICLE,status:NETWORK_STATUS.SUCCESS}));
      return updateLocalArticles(dispatch,getState);
    }).catch((error)=>{
      dispatch(simpleAction({type:DELETE_ARTICLE,status:NETWORK_STATUS.ERROR,error}))
    })
  }
}
