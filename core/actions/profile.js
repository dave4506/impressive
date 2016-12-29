import firebase from 'firebase'
import {Map} from 'immutable'
import {simpleAction} from '../helper'

import {
  PULL_PROFILE,
  EDIT_PROFILE,
  SAVE_PROFILE,
  NETWORK_STATUS,
  CREATE_PROFILE
} from "../constants";


export const pullProfile = (id) => {
  return (dispatch) => {
    const database = firebase.database();
    dispatch(simpleAction({type:PULL_PROFILE,status:NETWORK_STATUS.LOADING}))
    return database.ref(`/profiles/${id}/`).once('value').then((snapshot)=>{
      const profile = Map(snapshot.val());
      dispatch(simpleAction({type:PULL_PROFILE,status:NETWORK_STATUS.SUCCESS,profile}))
    }).catch((error)=>{
      dispatch(simpleAction({type:PULL_PROFILE,status:NETWORK_STATUS.ERROR,error}))
    })
  }
}


export const editProfile = (newProfile) => {
  return (dispatch,getState) => {
    const database = firebase.database();
    const uid = getState().get("user").get("uid");
    const profile = getState().get("profile");
    const { displayName, subtext, link, shareLink, photoURL, email} = profile.merge(newProfile).toJS();
    dispatch(simpleAction({type:EDIT_PROFILE,profile:profile.merge(newProfile)}))
    dispatch(simpleAction({type:SAVE_PROFILE,status:NETWORK_STATUS.LOADING}))
    return database.ref(`/profiles/${uid}/`).set({ displayName, subtext, link, shareLink, photoURL, email})
      .then(()=>{
        dispatch(simpleAction({type:SAVE_PROFILE,status:NETWORK_STATUS.SUCCESS}))
      })
      .catch(error=>{
        dispatch(simpleAction({type:SAVE_PROFILE,status:NETWORK_STATUS.ERROR,error}))
        dispatch(simpleAction({type:EDIT_PROFILE,profile:profile}))
      })
  }
}

export const createProfile = (newProfile) => {
  return editProfile(newProfile);
}
