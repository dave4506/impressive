import firebase from 'firebase'
import {simpleAction} from '../helper';
import {
  NETWORK_STATUS,
  PROFILE_PIC_UPLOAD,
  EDITOR_STATE_FILE_UPLOAD,
  FILE_DELETE,
  EDITOR_STATE_FILE_PREVIEW
} from "../constants";

import history from '../history'
import {saveArticleState} from './current';

const storage = firebase.storage();

export const upload = (ref,file,type) => {
  return (dispatch,getState) => {
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

const createLocalFileUrl = (file) => {
  return new Promise((res,rej)=>{
    const reader  = new FileReader();
    reader.onloadend = function () {
      res(reader.result);
    }
    reader.readAsDataURL(file);
  })
}

export const uploadEditorState = (fileData,hash,key,structure,custom) => {
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
      dispatch(simpleAction({type:EDITOR_STATE_FILE_UPLOAD,status:NETWORK_STATUS.LOADING,loading:0,fileHash,index:blockIndex,init:"init"}));
      const uploadTask = ref.put(file);
      uploadTask.on('state_changed', function(snapshot){
        const loading = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        dispatch(simpleAction({type:EDITOR_STATE_FILE_UPLOAD,status:NETWORK_STATUS.LOADING,loading,fileHash,index:blockIndex}));
      });
      return createLocalFileUrl(file).then((src)=>{
        dispatch(simpleAction({type:EDITOR_STATE_FILE_PREVIEW,src,index:blockIndex,fileHash}));
        return uploadTask
      }).then(function(snapshot) {
        var obj = {}
        if(structure == 'single')
          obj[key] = snapshot.downloadURL
        if(structure == 'array')
          obj[key] = (block.props[key] || []).concat([snapshot.downloadURL])
        if(structure == 'custom')
          obj[key] = custom((block.props[key] || []),snapshot.downloadURL)
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
