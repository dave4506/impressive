import firebase from 'firebase'
import {List} from 'immutable'
import {pullGroups} from './group'
import {pullArticles} from './article'
import {simpleAction} from '../helper'
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
  DELETE_ARTICLE,
  GROUP_KEYS
} from "../constants";

const database = firebase.database();

const editorState = convertToRaw(createEditorState().getCurrentContent());

const updateLocalArticles = (dispatch,getState) => {
  return pullArticles()(dispatch,getState).then(()=>{
    const current = getState().get("current");
    if(current.get("article").get("uid") != "")
      dispatch(setCurrentId(current.get("article").get("uid")))
  })
}

const updateLocalGroups = (dispatch,getState) => {
  return pullGroups()(dispatch,getState);
}

export const setCurrentId = (id) => {
  return (dispatch,getState) => {
    const article = getState().get("article");
    const uid = getState().get("user").get("uid");
    const draft = getState().get("draft");
    const currentArticle = article.get("articles").get(id);
    console.log("current",currentArticle);
    var draftId = currentArticle.get("currentDraft");
    const editable = uid == currentArticle.get("author");
    if(!editable) {
      draftId = currentArticle.get("publicDraft");
    }
    const currentDraft = draft.get("drafts").get(draftId);
    dispatch(simpleAction({
      type:SET_CURRENT_ARTICLE,
      article:currentArticle,
      draft:currentDraft,
      editable
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

// TODO: ADD a default editor state
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
    const {profile,current} = getState();
    const articleId = current.get("article").get("id");
    const discardedDraftId = current.get("article").get("currentDraft");
    const draftId = current.get("article").get("publishDraft");
    updates[`articles/${articleId}/currentDraft`] = draftId;
    updates[`drafts/${discardedDraftId}/`] = null;
    return database.ref().update(updates).then(()=>{
      dispatch(simpleAction({type:DELETE_DRAFT,status:NETWORK_STATUS.SUCCESS}));
      return updateLocalArticles(dispatch,getState);
    }).catch((error)=>{
      dispatch(simpleAction({type:DELETE_DRAFT,status:NETWORK_STATUS.ERROR,error}))
    })
  }
}

export const createArticle = (title) => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:CREATE_ARTICLE,status:NETWORK_STATUS.LOADING}));
    var updates = {};
    const user = getState().get("user");
    const uid = user.get("uid");
    const articleId = database.ref('/articles').push().key
    const newDraftId = database.ref(`drafts`).push().key;
    const newDraft = {editorState,articleId};
    updates[`user_articles/${uid}/${articleId}`] = true;
    updates[`articles/${articleId}/`] = {publicDraft:"none",currentDraft:newDraftId,title};
    updates[`drafts/${newDraftId}`] = newDraft;
    updates[`user_groups/${uid}/${GROUP_KEYS.NONE}/${articleId}`] = true;
    return database.ref().update(updates).then(()=>{
      dispatch(simpleAction({type:CREATE_ARTICLE,status:NETWORK_STATUS.SUCCESS}));
      return updateLocalArticles(dispatch,getState);
    }).then((a)=>{console.log("here?")}).catch((error)=>{
      dispatch(simpleAction({type:CREATE_ARTICLE,status:NETWORK_STATUS.ERROR,error}))
    })
  }
}

export const deleteArticle = () => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:DELETE_ARTICLE,status:NETWORK_STATUS.LOADING}));
    var updates = {};
    const {profile,current} = getState();
    const articleId = current.get("article")
    const currentDraftId = current.get("article").get("currentDraft");
    const publishDraftId = current.get("article").get("publishDraft");
    const newDraft = {editorState:{},articleId};
    updates[`user_articles/${profile.get("id")}/${articleId}`] = null;
    updates[`articles/${articleId}/`] = null;
    updates[`drafts/${currentDraftId}`] = null;
    updates[`drafts/${publishDraftId}`] = null;
    Object.keys(GROUP_KEYS).map((k)=>{
      updates[`user_groups/${profile.get("id")}/${k}/${articleId}`] = null
    })
    return database.ref().update(updates).then(()=>{
      dispatch(simpleAction({type:DELETE_ARTICLE,status:NETWORK_STATUS.SUCCESS}));
      return updateLocalArticles(dispatch,getState);
    }).catch((error)=>{
      dispatch(simpleAction({type:DELETE_ARTICLE,status:NETWORK_STATUS.ERROR,error}))
    })
  }
}
