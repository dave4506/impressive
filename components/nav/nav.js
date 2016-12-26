import React, { PropTypes } from 'react';
import s from './nav.css';

const Nav = ({style,title,onMenuClick,onClick,links}) => {
  return (
    <div style={style} className={`${s["navbar"]}`}>
      {links.map((l,i)=>{
        return (<button key={i} onClick={()=>{onClick(i)}} className={`${s["navbar-links"]}`}>{l}</button>)
      })}
      <h3 className={`${s["navbar-title"]}`}>{title}</h3>
    </div>
  )
}

export default Nav;
