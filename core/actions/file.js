import firebase from 'firebase'
import {simpleAction} from '../helper';
import {
  NETWORK_STATUS,
  PROFILE_PIC_UPLOAD
} from "../constants";

import history from '../history'

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
    console.log(PROFILE_PIC_UPLOAD);
    dispatch(upload(storage.ref("photoURL"),file,PROFILE_PIC_UPLOAD))
  }
}
