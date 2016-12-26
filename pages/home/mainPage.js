import React, { PropTypes } from 'react';
import s from './mainPage.css';
import Nav from '../../components/nav/nav'
import ChatbarStd from '../../components/chatbar/standard'


const MainPage = () => {
  return (
    <div className={`${s["main-page"]}`}>
      <Nav title="introduction" links={["follow author","share"]}/>
      <div className={`${s["main-page-chatbar"]}`}>
        <ChatbarStd placeholder="Have a question? Ask here and I’ll get back to you soon! "/>
      </div>
    </div>
  )
}

export default MainPage
