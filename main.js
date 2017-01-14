/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Provider } from 'react-redux';

import store from './core/store';
import router from './core/router';
import history from './core/history';
import firebase from 'firebase';
import {logOut,currentUserStatus,ifProfileExists} from './core/actions/user';
import {ifArticleExists} from './core/helper';

var config = {
  apiKey: "AIzaSyCMKqniQiTAeL4Ayd0xP-XtQynfHkG7L3I",
  authDomain: "impresssive-86554.firebaseapp.com",
  databaseURL: "https://impresssive-86554.firebaseio.com",
  storageBucket: "impresssive-86554.appspot.com",
  messagingSenderId: "102918285946"
};

firebase.initializeApp(config);
let routes = require('./routes.json'); // Loaded with utils/routes-loader.js
const container = document.getElementById('container');

function renderComponent(component) {
  ReactDOM.render(<Provider store={store}>{component}</Provider>, container);
}

const handleBeforeRender = (location) => {
  if(location.pathname == '/')
    return currentUserStatus().then((uid)=>{
      console.log("uid:",uid)
      if(uid) {
        history.push(`/dashboard?uid=${uid}`);
        return false;
      } else {
        return true;
      }
    })
  if(location.pathname == '/edit' || location.pathname == '/edit/' || location.pathname == '/dashboard/' || location.pathname == '/dashboard')
    return currentUserStatus().then((uid)=>{
      console.log("uid:",uid)
      if(uid) {
        return ifProfileExists(uid).then((exists)=>{
          if(!exists) {
            history.push(`/error?err=not_found`);
            return false
          }
          else {
            if(uid == location.query.uid)
              return true
            else {
              history.push(`/error?err=not_found`);
              return false
            }
          }
        });
      } else {
        history.push(`/error?err=cant_access`);
        return false;
      }
    })
  if(location.pathname == '/enjoy' || location.pathname == '/enjoy/') {
    return ifArticleExists(location.query.aid).then((status)=>{
      return status;
    })
  }
  return Promise.resolve(true);
}
// Find and render a web page matching the current URL path,
// if such page is not found then render an error page (see routes.json, core/router.js)
function render(location) {
  handleBeforeRender(location).then((renderable)=>{
    if(renderable)
      return router.resolve(routes, location)
        .then(renderComponent)
        .catch(error => {
          console.log("ERROR:",error);
          router.resolve(routes, { ...location, error }).then(renderComponent)
        });
  })
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/ReactJSTraining/history/tree/master/docs#readme
history.listen(render);

render(history.getCurrentLocation());

// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
FastClick.attach(document.body);

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./routes.json', () => {
    routes = require('./routes.json'); // eslint-disable-line global-require
    render(history.getCurrentLocation());
  });
}
