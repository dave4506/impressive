import React, { PropTypes } from 'react';
import s from './chatbar.css';
import Image from '../image/image'

class Chatbar extends React.Component {
  constructor(props){
    super(props);
    this.state={
      currentIcon:""
    }
  }

  render() {
    const {icons,onClick,instruct} = this.props;
    const {currentIcon} = this.state;
    const resetCurrent = ()=>{this.setState({currentIcon:""})};
    const changeCurrent = (icon)=>{this.setState({currentIcon:icon})};
    return (
      <div className={`${s["chatbar"]} ${s["chatbar-icons"]}`}>
        <div className={`${s["chatbar-spacer"]}`}></div>
        <div className={`${s["chatbar-text"]}`}>{instruct}</div>
        {icons.map((i,index)=>{
          return <div key={index} onMouseLeave={resetCurrent} onMouseEnter={()=>{changeCurrent(i.publicText || i.key)}} className={`${s["chatbar-icon"]}`}>
            <Image width="2.5rem" height="2.5rem" src={i.src} onClick={()=>{onClick(i.key)}}/>
          </div>
        })}
        <div className={`${s["chatbar-text"]}`}>{currentIcon}</div>
      </div>
    )
  }
}

export default Chatbar;
