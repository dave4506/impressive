/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { createStore,applyMiddleware } from 'redux';
import reducer from './reducer'
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  const logger = createLogger();
  middlewares.push(logger);
}

var store = null;

store = createStore(reducer,applyMiddleware(...middlewares));

store.getState();

export default store;
