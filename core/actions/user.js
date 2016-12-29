import firebase from 'firebase'
import {simpleAction} from '../helper'
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

export const logInWithFB = () => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:LOG_IN,status:NETWORK_STATUS.LOADING}))
    firebase.auth().signInWithPopup(provider).then(function(result) {
      const {photoURL,uid,displayName,email} = result.user;
      const user = {photoURL,uid,displayName,email}
      dispatch(simpleAction({type:LOG_IN,status:NETWORK_STATUS.SUCCESS,user}))
    }).catch(function(error) {
      dispatch(simpleAction({type:LOG_IN,status:NETWORK_STATUS.ERROR,error}))
    });
  }
}

export const logOut = () => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:LOG_OUT,status:NETWORK_STATUS.LOADING}))
    firebase.auth().signOut().then(function() {
      dispatch(simpleAction({type:LOG_OUT,status:NETWORK_STATUS.SUCCESS}))
    }, function(error) {
      dispatch(simpleAction({type:LOG_OUT,status:NETWORK_STATUS.ERROR,error}))
    });
  }
}

export const monitorLogIn = () => {
  return (dispatch,getState) => {
    dispatch(simpleAction({type:USER_STATUS_CHANGE,status:NETWORK_STATUS.LOADING}))
    firebase.auth().onAuthStateChanged(function(user) {
      const ui = getState().get("ui");
      if (user) {
        dispatch(simpleAction({type:USER_STATUS_CHANGE,status:NETWORK_STATUS.SUCCESS,user}));
      } else {
        dispatch(simpleAction({type:USER_STATUS_CHANGE,status:NETWORK_STATUS.SUCCESS}));
      }
      handleUser(ui.get("appState"),user!=null,user);
    });
  }
}

export const handleUser = (state,exists,user) => {
  const location = history.getCurrentLocation();
  console.log(location);
  if(exists) {
    if(state==APP_STATE.INDEX)
      history.push(`/edit?uid=${user.uid}`);
    if(state==APP_STATE.EDIT || state==APP_STATE.VIEW)
      if(location.query.uid != user.uid)
        history.push('/?err=cant_access');
  } else {
    if(state==APP_STATE.EDIT || state==APP_STATE.VIEW)
      history.push('/?err=cant_access');
  }
}
