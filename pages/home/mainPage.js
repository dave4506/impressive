import React, { PropTypes } from 'react';
import s from './mainPage.css';
import Nav from '../../components/nav/nav'
import Dropdown from '../../components/nav/dropdown'
import ChatbarStd from '../../components/chatbar/standard'
import Editor from '../../components/editor/editor'


const MainPage = () => {
  return (
    <div className={`${s["main-page"]}`}>
      <div className={`${s["main-nav"]}`}>
        <Nav title="introduction" links={["follow author","share"]}/>
      </div>
      <div className={`${s["main-editor"]}`}>
        <Editor/>
      </div>
      <div className={`${s["main-page-chatbar"]}`}>
        <ChatbarStd second={true} secondPlaceholder="email please" status={{text:"",indicator:"loading"}} placeholder="Have a question? Ask here and I’ll get back to you soon! "/>
      </div>
    </div>
  )
}

export default MainPage

/*
<Dropdown defaultAccordion={true} links={["flex","this is me","wow so cool!","deamn"]}/>
*/
