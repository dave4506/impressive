import React, { PropTypes } from 'react';
import s from './accordion.css';

const Article = ({src,title,subText,onClick,i}) => {
  return (
    <div style={{backgroundColor:(i%2==0 ? "#E2F9EA":"#EDF8F1")}} onClick={onClick} className={`${s["accordion-article"]}`}>
      <h2 className={`${s["accordion-article-author"]}`}>{title}</h2>
      <h4 className={`${s["accordion-article-subtext"]}`}>{subText}</h4>
    </div>
  )
}

export default Article;
