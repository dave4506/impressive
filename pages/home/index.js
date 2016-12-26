/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import s from './styles.css';
import Layout from '../../components/layout/sidebar'
import Sidebar from './sidebar'
import Mainpage from './mainPage'

class HomePage extends React.Component {

  static propTypes = {
  };

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Layout mainPage={Mainpage()} sideBar={Sidebar()}/>
      </div>
    );
  }

}

export default HomePage;
