import React, { PropTypes } from 'react';
import s from './chatbar.css';
import Image from '../image/image'

class Chatbar extends React.Component {
  constructor(props){
    super(props);
    this.state={
    }
  }

  render() {
    const {texts} = this.props;
    return (
      <div className={`${s["chatbar"]} ${s["chatbar-texts"]}`}>
        <div className={`${s["chatbar-spacer"]}`}></div>
        {(texts.map((t,i)=>{
          return <div className={`${s["chatbar-text"]}`}>{t}</div>
        }))}
      </div>
    )
  }
}

export default Chatbar;
