import React, { PropTypes } from 'react';
import s from './mainPage.css';
import Nav from '../../components/nav/nav'
import Dropdown from '../../components/nav/dropdown'
import Chatbar from '../../components/chatbar/index'
import Editor from '../../components/editor/editor'
import Image from '../../components/image/image'

const MainPage = () => {
  return (
    <div className={`${s["main-page"]}`}>
      <div className={`${s["main-editor"]}`}>
        <Editor/>
      </div>
    </div>
  )
}

export default MainPage

/*
<Dropdown defaultAccordion={true} links={["flex","this is me","wow so cool!","deamn"]}/>
*/
