import {
  NETWORK_STATUS
} from "./constants"

import {Map} from 'immutable'
import firebase from 'firebase'

export const onSuccess = (action) => {
  return action.status == NETWORK_STATUS.SUCCESS;
}

export const pullPromises = (ref,ids) => {
  const database = firebase.database();
  const promises = ids.map((id)=>{
    return database.ref(ref).child(id).once('value').then((snapshot)=>{
      return Object.assign({uid:snapshot.key},snapshot.val());
    })
  })
  return promises
}

export const convertToObject = (list,key) => {
  var obj = {};
  list.forEach((li)=>{
    obj[li[key]] = Map(li);
  })
  return Map(obj);
}

export const simpleAction = (obj) => {
  return obj;
}

export const ifArticleExists = (articleId) => {
  const database = firebase.database();
  return database.ref('/shorten/'+articleId).once('value').then((snapshot)=>{
    return snapshot.val() != null
  });
}
