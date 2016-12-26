import React, { PropTypes } from 'react';
import s from './list.css';
import ListItem from './listItem';
import Help from './help'
const Title = ({children}) => {
  return (
    <ListItem>
      <div className={`${s["list-title"]}`}>
        <p>{children}</p>
      </div>
    </ListItem>
  )
}

export default Title;
