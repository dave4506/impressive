import firebase from 'firebase'
import {Map} from 'immutable'
import {simpleAction} from '../helper'

import {
  PULL_PROFILE,
  EDIT_PROFILE,
  SAVE_PROFILE,
  NETWORK_STATUS
} from "../constants";

const database = firebase.database();

export const pullProfile = (id) => {
  return (dispatch) => {
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
    const {profile} = getState();
    dispatch(simpleAction({type:EDIT_PROFILE,profile:profile.merge(newProfile)}))
    dispatch(simpleAction({type:SAVE_PROFILE,status:NETWORK_STATUS.LOADING}))
    return database.ref(`/profiles/${profile.id}/`).set(profile.merge(newProfile).toJS())
      .then(()=>{
        dispatch(simpleAction({type:SAVE_PROFILE,status:NETWORK_STATUS.SUCCESS}))
      })
      .catch(error()=>{
        dispatch(simpleAction({type:SAVE_PROFILE,status:NETWORK_STATUS.ERROR,error}))
        dispatch(simpleAction({type:EDIT_PROFILE,profile:profile}))
      })
  }
}
