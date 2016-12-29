import {
  NETWORK_STATUS
} from "./constants"

import firebase from 'firebase'

export const onSuccess = (action) => {
  return action.status == NETWORK_STATUS.SUCCESS;
}

export const pullPromises = (ref,ids) => {
  const database = firebase.database();
  const promises = ids.map((id)=>{
    return database.ref(ref).child(id).once('value').then((snapshot)=>{
      return Object.assign({id:snapshot.key},snapshot.val());
    })
  })
  return promises
}

export const convertToObject = (list,key) => {
  var obj = {};
  list.forEach((li)=>{
    obj[li[key]] = li;
  })
  return obj;
}

export const simpleAction = (obj) => {
  return obj;
}
