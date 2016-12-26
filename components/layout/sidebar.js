import React, { PropTypes } from 'react';
import s from './sidebar.css';

const statusClass = (status) => {
  return status == "open" ? "__open" : "__close"
}

const Sidebar = ({mainPage,sideBar}) => {
  return (
    <div className={`${s["menu"]}`}>
      <div className={`${s["menu-sidebar"]}`}>
        {sideBar}
      </div>
      <div className={`${s["menu-main-content"]}`}>
        {mainPage}
      </div>
    </div>
  )
}

export default Sidebar;
