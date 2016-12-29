import React, { PropTypes } from 'react';
import s from './styles.css';
import Layout from '../../components/layout/sidebar'
import Sidebar from './sidebar'
import Mainpage from './mainPage'

class EditPage extends React.Component {

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

export default EditPage;
