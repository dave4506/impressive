import React, { PropTypes } from 'react';
import s from './list.css';
import ListItem from './listItem';

const Tabs = ({tabs,active,onClick}) => {
  return (
    <ListItem>
      <div className={`${s["list-tabs"]}`}>
        {tabs.map(((t,i)=>{
          return (
            <div onClick={(e)=>{onClick(i)}} key={t} className={`${s["list-tab"]} ${s["list-tab__" + (active==i ? "active":"unactive")]}`}>{t}</div>
          )
        }))}
      </div>
    </ListItem>
  )
}

export default Tabs;
