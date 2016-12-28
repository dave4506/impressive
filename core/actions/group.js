import firebase from 'firebase'
import {Map} from 'immutable'

import {
  PULL_GROUPS,
  NETWORK_STATUS
} from "../constants";

const database = firebase.database();

export const pullGroups = () => {
  return (dispatch,getState) => {
    const {profile} = getState();
    dispatch((()=>{type:PULL_GROUPS,status:NETWORK_STATUS.LOADING})())
    return database.ref(`/user_groups/${id}/`).once('value').then((snapshot)=>{
      const articleIds = Map(snapshot.val());
      dispatch((()=>{type:PULL_GROUPS,status:NETWORK_STATUS.SUCCESS,articleIds})())
    }).catch((error)=>{
      dispatch((()=>{type:PULL_GROUPS,status:NETWORK_STATUS.ERROR,error})())
    })
  }
}
