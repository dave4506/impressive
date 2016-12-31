import firebase from 'firebase'
import {simpleAction} from '../helper';
import {createProfile} from './profile';
import {
  NETWORK_STATUS,
  LOG_IN,
  LOG_OUT,
  USER_STATUS_CHANGE,
  APP_STATE
} from "../constants";

import history from '../history'
var provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('public_profile');

const ifProfileExists = (user,dispatch) => {
  const {photoURL,uid,displayName,email} = user;
  return firebase.database().ref(`profiles/${uid}`).once("value").then((snapshot)=>{
    return snapshot.val() != null;
  }).then((exists)=> {
    if(!exists)
      dispatch(createProfile({
        photoURL,
        displayName,
        subtext:"I'm a cool kid",
        link:"",
        shareLink:`impresssive.co/view?uid=${uid}`,
        email
      }))
  });
}

export const logInWithFB = () => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:LOG_IN,status:NETWORK_STATUS.LOADING}))
    firebase.auth().signInWithPopup(provider).then(function(result) {
      const {photoURL,uid,displayName,email} = result.user;
      const user = {photoURL,uid,displayName,email}
      dispatch(simpleAction({type:LOG_IN,status:NETWORK_STATUS.SUCCESS,user}));
      history.push(`/edit?uid=${uid}`);
      return ifProfileExists(user,dispatch)
    }).catch(function(error) {
      dispatch(simpleAction({type:LOG_IN,status:NETWORK_STATUS.ERROR,error}))
    });
  }
}

export const getCurrentUser = () => {
  const {photoURL,uid,displayName,email} = firebase.auth().currentUser;
  const user = {photoURL,uid,displayName,email}
  return {type:USER_STATUS_CHANGE,status:NETWORK_STATUS.SUCCESS,user}
}

export const logOut = () => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:LOG_OUT,status:NETWORK_STATUS.LOADING}))
    return firebase.auth().signOut().then(function() {
      dispatch(simpleAction({type:LOG_OUT,status:NETWORK_STATUS.SUCCESS}))
    }, function(error) {
      dispatch(simpleAction({type:LOG_OUT,status:NETWORK_STATUS.ERROR,error}))
    });
  }
}

export const currentUserStatus = () => {
  return new Promise((res,rej)=>{
    const unListen = firebase.auth().onAuthStateChanged(function(user,error,completed) {
      if(error) {
        unListen();
        rej(err);
      }
      if (user) {
        res(user.uid);
      } else {
        res();
      }
    });
  })
}
