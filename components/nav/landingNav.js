import React, { PropTypes } from 'react';
import s from './nav.css';
import history from '../../core/history'

const Nav = ({title,onClickL,onClickR,linksR,linksL}) => {
  return (
    <div className={`${s["navbar"]} ${s["navbar-landing"]}`}>
      {linksL.map((l,i)=>{
        return (<button key={i} onClick={()=>{onClickL(i)}} className={`${s["navbar-links"]}`}>{l}</button>)
      })}
      <h3 onClick={()=>{history.push('/')}} className={`${s["navbar-title"]}`}>{title}</h3>
      {linksR.map((l,i)=>{
        return (<button key={i} onClick={()=>{onClickR(i)}} className={`${s["navbar-links"]}`}>{l}</button>)
      })}
    </div>
  )
}

export default Nav;
