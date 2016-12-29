import React, { PropTypes } from 'react';
import s from './list.css';
import ListItem from './listItem';

const Header = ({src,author,subtext,link}) => {
  return (
    <ListItem>
      <div className={`${s["list-header"]}`}>
        <img className={`${s["list-header-profile"]}`} src={src}/>
        <div className={`${s["list-header-text"]}`}>
          <h1 className={`${s["list-header-author"]}`}>{author}</h1>
          <h4 className={`${s["list-header-subtext"]}`}>{subtext}</h4>
        </div>
        <div className={`${s["list-header-links"]}`}>
          <svg className={`${s["list-header-link"]}`} width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>theicons.co/svg/ui-52</title><desc>Created with Sketch.</desc><path d="M28.249 16.922c.777-.777 2.035-.78 2.822.007.781.781.779 2.049.007 2.822l-11.327 11.327c-.777.777-2.035.78-2.822-.007-.781-.781-.779-2.049-.007-2.822l11.327-11.327zm-5.663 16.977l-5.657 5.657c-2.341 2.341-6.146 2.339-8.485 0-2.341-2.341-2.34-6.145 0-8.485l5.657-5.657c.781-.781.781-2.047 0-2.828-.781-.781-2.047-.781-2.828 0l-5.657 5.657c-3.902 3.902-3.904 10.238 0 14.142 3.901 3.901 10.239 3.903 14.142 0l5.657-5.657c.781-.781.781-2.047 0-2.828-.781-.781-2.047-.781-2.828 0zm14.142-8.485l5.657-5.657c3.903-3.903 3.901-10.241 0-14.142-3.904-3.904-10.24-3.902-14.142 0l-5.657 5.657c-.781.781-.781 2.047 0 2.828.781.781 2.047.781 2.828 0l5.657-5.657c2.34-2.34 6.144-2.341 8.485 0 2.339 2.339 2.341 6.145 0 8.485l-5.657 5.657c-.781.781-.781 2.047 0 2.828.781.781 2.047.781 2.828 0z" fill="#000"/></svg>
        </div>
      </div>
    </ListItem>
  )
}

export default Header;
