import React, { PropTypes } from 'react';
import s from './mainPage.css';
import Nav from '../../components/nav/nav'
import Dropdown from '../../components/nav/dropdown'
import ChatbarStd from '../../components/chatbar/standard'


const MainPage = () => {
  return (
    <div className={`${s["main-page"]}`}>
      <div className={`${s["main-nav"]}`}>
        <Nav title="introduction" links={["follow author","share"]}/>
        <Dropdown defaultAccordion={true} links={["flex","this is me","wow so cool!","deamn"]}/>
      </div>
      <div className={`${s["main-page-chatbar"]}`}>
        <ChatbarStd second={true} secondPlaceholder="email please" status={{text:"loading",indicator:"loading"}} placeholder="Have a question? Ask here and I’ll get back to you soon! "/>
      </div>
    </div>
  )
}

export default MainPage
