import firebase from 'firebase'
import {simpleAction} from '../helper';
import {
  NETWORK_STATUS,
  PROFILE_PIC_UPLOAD,
  EDITOR_STATE_FILE_UPLOAD,
  FILE_DELETE
} from "../constants";

import history from '../history'
import {saveArticleState} from './current';

const storage = firebase.storage();

export const upload = (ref,file,type) => {
  return (dispatch,getState) => {
    console.log(type)
    dispatch(simpleAction({type,status:NETWORK_STATUS.LOADING}));
    return ref.put(file).then(function(snapshot) {
      dispatch(simpleAction({type,status:NETWORK_STATUS.SUCCESS,url:snapshot.downloadURL}));
    }).catch((error)=>{
      dispatch(simpleAction({type,status:NETWORK_STATUS.ERROR,error}));
    });
  }
}

export const uploadProfilePic = (file) => {
  return (dispatch) => {
    dispatch(upload(storage.ref("/photoURL/"),file,PROFILE_PIC_UPLOAD))
  }
}

export const uploadEditorState = (fileData,hash,key,structure) => {
  return (dispatch,getState) => {
    const uid = history.getCurrentLocation().query.uid;
    const editorState = getState().get("current").get("article").get("editorState");
    const block = editorState.find((e)=>{return e.hash == hash});
    if(block != null) {
      const blockIndex = editorState.indexOf(block);
      const {fileHash,file} = fileData
      var ref = storage.ref("/editorStatePhotos/").child(`${uid}_|_${hash}_|_${fileHash}.jpg`)
      if(structure == 'single')
        if(block.props[key] != null)
          if(block.props[key].indexOf('default') == -1)
            ref = storage.refFromURL(block.props[key]);
      dispatch(simpleAction({type:EDITOR_STATE_FILE_UPLOAD,status:NETWORK_STATUS.LOADING,fileHash,index:blockIndex}));
      return ref.put(file).then(function(snapshot) {
        var obj = {}
        if(structure == 'single')
          obj[key] = snapshot.downloadURL
        if(structure == 'array')
          obj[key] = (block.props[key] || []).push(snapshot.downloadURL)
        dispatch(simpleAction({type:EDITOR_STATE_FILE_UPLOAD,status:NETWORK_STATUS.SUCCESS,fileHash,index:blockIndex,newBlockProps:obj}));
        dispatch(saveArticleState(getState().get("current").get("article").get("editorState")))
      }).catch((error)=>{
        dispatch(simpleAction({type:EDITOR_STATE_FILE_UPLOAD,status:NETWORK_STATUS.ERROR,fileHash,index:blockIndex,error}));
      });
    }
  }
}

export const deleteFile = (url) => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:FILE_DELETE,status:NETWORK_STATUS.LOADING}));
    return storage.refFromURL(url).delete().then(function(snapshot) {
      dispatch(simpleAction({type:FILE_DELETE,status:NETWORK_STATUS.SUCCESS}));
    }).catch((error)=>{
      dispatch(simpleAction({type:FILE_DELETE,status:NETWORK_STATUS.ERROR,fileHash,index:blockIndex,error}));
    });
  }
}
