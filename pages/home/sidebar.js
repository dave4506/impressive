import React, { PropTypes } from 'react';
import s from './sidebar.css';
import Footer from '../../components/list/footer'
import List from '../../components/list/list'
import Header from '../../components/list/header'
import Tabs from '../../components/list/tabs'
import Collapse from '../../components/list/collapseListItem'
import Article from '../../components/accordion/article'

const src = require('./profile.png');

const sideBar = () => {
  return (
    <div className={`${s["side-bar"]}`}>
      <List>
        <Header src={src} subText="Designer, artist, developer" author="David Sun"/>
        <Tabs tabs={["Curated","All Articles"]} active={0}/>
        <Collapse defaultAccordion={true} title="This is me">
          <Article i={0} title="Hello World?" subText="this is cool..."/>
          <Article i={1} title="Hello World?" subText="this is cool..."/>
        </Collapse>
        <Footer>
          <div className={`${s["side-bar-footer-text"]}`}>
            <h3>impresssive.co</h3>
            <h4>Created with love by download horizons.</h4>
          </div>
        </Footer>
      </List>
    </div>
  )
}

export default sideBar
