import firebase from 'firebase'
import {List} from 'immutable'
import {pullGroups} from './group'
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
  CREATE_DRAFT,
  SAVE_DRAFT,
  MOVE_GROUP,
  PUBLISH_DRAFT,
  DELETE_DRAFT,
  CREATE_ARTICLE,
  SAVE_ARTICLE,
  DELETE_ARTICLE,
  GROUP_KEYS
} from "../constants";

import {defaultBlockProps} from '../../pages/blocks'

const database = firebase.database();

const defaultEditorState = [{type:"PROFILE",props:defaultBlockProps("PROFILE")}]

const updateLocalArticles = (dispatch,getState) => {
  return pullArticles()(dispatch,getState)
}

const updateLocalGroups = (dispatch,getState) => {
  return pullGroups()(dispatch,getState);
}

export const setCurrent = (id) => {
  return (dispatch,getState) => {
    dispatch(simpleAction({
      type:SET_CURRENT_ARTICLE,
      article:getState().get("article").get("articles").get(id)
    }))
  }
}

export const moveGroup = (from,to) => {
  return (dispatch,getState) => {
    const {profile,current} = getState();
    dispatch(simpleAction({type:MOVE_GROUP,status:NETWORK_STATUS.LOADING}))
    return database.ref(`/user_groups/${id}/${from}/${current.get("article").get("id")}`).set(null).then(()=>{
      return database.ref(`/user_groups/${id}/${to}/${current.get("article").get("id")}`).set(true)
    }).then(()=>{
      dispatch(simpleAction({type:MOVE_GROUP,status:NETWORK_STATUS.SUCCESS}));
      return updateLocalGroups(dispatch,getState)
    }).catch((error)=>{
      dispatch(simpleAction({type:MOVE_GROUP,status:NETWORK_STATUS.ERROR,error}))
    })
  }
}

export const createDraft = () => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:CREATE_DRAFT,status:NETWORK_STATUS.LOADING}));
    var updates = {};
    const {profile,current} = getState();
    const articleId = current.get("article").get("id");
    const newDraftId = database.ref(`drafts`).push().key;
    const newDraft = {editorState,articleId};
    updates[`articles/${articleId}/currentDraft`] = newDraftId;
    updates[`drafts/${newDraftId}`] = newDraft
    return database.ref().update(updates).then(()=>{
      dispatch(simpleAction({type:CREATE_DRAFT,status:NETWORK_STATUS.SUCCESS}))
      return updateLocalArticles(dispatch,getState)
    }).then(()=>{
      dispatch(updateAppState("EDIT"));
      dispatch(setCurrent(articleId));
    }).catch((error)=>{
      dispatch(simpleAction({type:CREATE_DRAFT,status:NETWORK_STATUS.ERROR,error}))
    })
  }
}

export const saveDraft = (newEditorState) => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:SAVE_DRAFT,status:NETWORK_STATUS.LOADING}));
    var updates = {};
    const {profile,current} = getState();
    const draftId = current.get("article").get("currentDraft");
    updates[`drafts/${draftId}/editorState`] = newEditorState;
    return database.ref().update(updates).then(()=>{
      dispatch(simpleAction({type:SAVE_DRAFT,status:NETWORK_STATUS.SUCCESS}));
      return updateLocalArticles(dispatch,getState)
    }).catch((error)=>{
      dispatch(simpleAction({type:SAVE_DRAFT,status:NETWORK_STATUS.ERROR,error}))
    })
  }
}

export const publishDraft = () => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:PUBLISH_DRAFT,status:NETWORK_STATUS.LOADING}));
    var updates = {};
    const {profile,current} = getState();
    const publishDraftKey = current.get("article").get("publishDraft");
    const draftKey = current.get("article").get("currentDraft");
    updates[`articles/${articleId}/publishDraft`] = draftKey;
    updates[`drafts/${publishDraftKey}`] = null;
    return database.ref().update(updates).then(()=>{
      dispatch(simpleAction({type:PUBLISH_DRAFT,status:NETWORK_STATUS.SUCCESS}))
      return updateLocalArticles(dispatch,getState);
    }).catch((error)=>{
      dispatch(simpleAction({type:PUBLISH_DRAFT,status:NETWORK_STATUS.ERROR,error}))
    })
  }
}

export const deleteDraft = () => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:DELETE_DRAFT,status:NETWORK_STATUS.LOADING}));
    var updates = {};
    const current = getState().get("current");
    const discardedDraftId = current.get("article").get("currentDraft");
    updates[`drafts/${discardedDraftId}/editorState`] = editorState
    return database.ref().update(updates).then(()=>{
      dispatch(simpleAction({type:DELETE_DRAFT,status:NETWORK_STATUS.SUCCESS}));
      return updateLocalArticles(dispatch,getState);
    }).catch((error)=>{
      dispatch(simpleAction({type:DELETE_DRAFT,status:NETWORK_STATUS.ERROR,error}))
    })
  }
}

export const saveArticleTitle = (title) => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:SAVE_ARTICLE,status:NETWORK_STATUS.LOADING,title}));
    var updates = {};
    const articleId = getState().get("current").get("article").get("uid")
    updates[`articles/${articleId}/title`] = title
    console.log(articleId,title)
    return database.ref().update(updates).then(()=>{
      dispatch(simpleAction({type:SAVE_ARTICLE,status:NETWORK_STATUS.SUCCESS,title}));
    }).catch((error)=>{
      dispatch(simpleAction({type:SAVE_ARTICLE,status:NETWORK_STATUS.ERROR,error}))
    })
  }
}

export const saveArticleState = (editorState) => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:SAVE_ARTICLE,status:NETWORK_STATUS.LOADING,editorState}));
    var updates = {};
    const articleId = getState().get("current").get("article").get("uid")
    updates[`articles/${articleId}/editorState`] = (editorState.length == 0 ? defaultEditorState:editorState);
    return database.ref().update(updates).then(()=>{
      dispatch(simpleAction({type:SAVE_ARTICLE,status:NETWORK_STATUS.SUCCESS,editorState}));
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
    updates[`articles/${articleId}/`] = {author:uid,views:0,title,shortId,editorState:defaultEditorState,public:false};
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

export const switchCurrentToNext = (dispatch,getState) => {
  const articles = getState().get("article").get("articles").toJS();
  if(Object.keys(articles).length == 0)
    return createArticle("This is me.")(dispatch,getState)
  else
    return setCurrentId(Object.keys(articles)[0])(dispatch,getState);
}
