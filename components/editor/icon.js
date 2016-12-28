import React, { PropTypes } from 'react';

const icon = (src,className)=>{
  return ({}) => {
    return (<div className={className}><img src={require(src)}/></div>)
  }
}

export default icon;
