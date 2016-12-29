import firebase from 'firebase'
import {Map} from 'immutable'
import {simpleAction} from '../helper'

import {
  PULL_GROUPS,
  NETWORK_STATUS
} from "../constants";

const database = firebase.database();

export const pullGroups = () => {
  return (dispatch,getState) => {
    const {profile} = getState();
    dispatch(simpleAction({type:PULL_GROUPS,status:NETWORK_STATUS.LOADING}))
    return database.ref(`/user_groups/${id}/`).once('value').then((snapshot)=>{
      const groups = Map(snapshot.val());
      dispatch(simpleAction({type:PULL_GROUPS,status:NETWORK_STATUS.SUCCESS,groups}))
    }).catch((error)=>{
      dispatch(simpleAction({type:PULL_GROUPS,status:NETWORK_STATUS.ERROR,error}))
    })
  }
}
