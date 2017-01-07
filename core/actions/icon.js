import firebase from 'firebase'
import {Map} from 'immutable'
import {simpleAction} from '../helper'

import {
  ICON_CAT_LOAD,
  ICON_LOAD,
  NETWORK_STATUS
} from "../constants";


const numberToString = (num) => {
  if (num < 10)
    return `0${num}`
  else
    return `${num}`
}

export const iconCatLoad = () => {
  return (dispatch) => {
    const database = firebase.database();
    const storage = firebase.storage();
    dispatch(simpleAction({type:ICON_CAT_LOAD,status:NETWORK_STATUS.LOADING}))
    return database.ref(`/icons/`).once('value').then((snapshot)=>{
      const categories = snapshot.val();
      const promises = Object.keys(categories).map((key)=>{
        const cat = categories[key];
        return storage.ref().child(`icons/${key}-${numberToString(1)}.svg`).getDownloadURL().then((url)=>{
          return {key,url,publicTitle:cat.publicTitle}
        })
      })
      return Promise.all(promises).then((urls)=>{
        var obj = {}
        urls.forEach((u)=>{
          const {key,url,publicTitle} = u;
          obj[key] = {url,publicTitle}
        })
        dispatch(simpleAction({type:ICON_CAT_LOAD,status:NETWORK_STATUS.SUCCESS,cat:Map(obj)}))
      })
    }).catch((error)=>{
      dispatch(simpleAction({type:ICON_CAT_LOAD,status:NETWORK_STATUS.ERROR,error}))
    })
  }
}

export const iconLoad = (key) => {
  return (dispatch,getState) => {
    const database = firebase.database();
    const storage = firebase.storage();
    dispatch(simpleAction({type:ICON_LOAD,status:NETWORK_STATUS.LOADING}))
    return database.ref(`/icons/${key}`).once('value').then((snapshot)=>{
      const cat = snapshot.val();
      const key = snapshot.key;
      var promises = [];
      for(var i = cat.startRange; i <= cat.endRange; i++) {
        promises.push(storage.ref().child(`icons/${key}-${numberToString(i)}.svg`).getDownloadURL())
      }
      return Promise.all(promises).then((urls)=>{
        dispatch(simpleAction({type:ICON_LOAD,status:NETWORK_STATUS.SUCCESS,key,urls}))
      })
    }).catch((error)=>{
      dispatch(simpleAction({type:ICON_LOAD,status:NETWORK_STATUS.ERROR,error}))
    })
  }
}
