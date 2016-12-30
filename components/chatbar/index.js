import React, { PropTypes } from 'react';
import s from './chatbar.css';
import BlankBar from './blankbar';
import StdBar from './standard'
import StdSingleBar from './standardSingle'
import IconBar from './iconbar'
import TextBar from './textBar'

const Chatbar = ({type,props}) => {
  switch (type) {
    case "icon":
      return <IconBar {...props}/>
    case "blank":
      return <BlankBar/>
    case "text":
      return <TextBar {...props}/>
    case "standardSingle":
      return <StdSingleBar {...props}/>
    case "standard":
    default:
      return <StdBar {...props}/>
  }
}
export default Chatbar;
