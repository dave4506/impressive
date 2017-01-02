import React, { PropTypes } from 'react';
import b from './block.css';
import s from './chat.css';
import Tools from '../tools';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {chat,description,title} = this.props;
    return <div className={`${b["block"]} ${s["block__chat"]}`} >
      <p className={`${b["block-title"]}`}>{title}</p>
      <div className={`${s["block-chatroom"]}`}>
        {chat.map((c,index)=>{
          return (
            <div key={index} className={`${s["block-chat-bubble-wrapper"]} ${s["block-chat-bubble-wrapper__"+c.direction]}`}>
              <p className={`${s["block-chat-bubble"]} ${s["block-chat-bubble__"+c.direction]}`}>{c.text}</p>
            </div>)
        })}
      </div>
      <p className={`${b["block-caption"]}`}>{description}</p>
    </div>
  }
}

export default Chat
