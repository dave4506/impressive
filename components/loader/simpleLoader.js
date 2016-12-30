import React, { PropTypes } from 'react';
import s from './simpleLoader.css';

const statusClass = (indicator) => {
  switch (indicator) {
    case "LOADING":
      return s["simple-indicator__loading"]
    case "SUCCESS":
      return s["simple-indicator__success"]
    case "ERROR":
      return s["simple-indicator__error"]
    case "WARNING":
      return s["simple-indicator__warning"]
    case "DISABLE":
      return s["simple-indicator__disable"]
    default:
      return s["simple-indicator__default"]
  }
}

const StatusIndicator = ({width,height,color,indicator}) => {
  return (
    <div style={{width,height,backgroundColor:color}} className={`${s["simple-indicator"]} ${statusClass(indicator)}`}></div>
  )
}

export default StatusIndicator;
