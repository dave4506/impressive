import React, { PropTypes } from 'react';
import b from './block.css';
import s from './chat.css';
import Tools from '../tools';

const ChatBubble = ({c,index}) => {
  return <div className={`${s["block-chat-bubble-wrapper"]} ${s["block-chat-bubble-wrapper__"+c.direction]}`}>
    <p className={`${s["block-chat-bubble"]} ${s["block-chat-bubble__"+c.direction]}`}>{c.text}</p>
    {(()=>{
      if(c.direction == "left")
        return <div className={`${s["chat-tools"]}`}>
          <img onClick={()=>{
              var newChat = [].concat(chat);
              newChat[index].direction = (newChat[index].direction == "right" ? "left":"right")
              onChange({chat:newChat});
            }} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-26.svg?alt=media&token=2bad8e49-1999-44c0-bc7c-02674547e99c"/>
          <img onClick={()=>{
              var newChat = [].concat(chat);
              newChat.splice(index,1)
              onChange({chat:newChat});
            }} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-15.svg?alt=media&token=d59e8719-fe0e-4333-bf3b-5dfaab428eee"/>
        </div>
      if(c.direction == "right")
        return <div className={`${s["chat-tools"]}`}>
          <img onClick={()=>{
              var newChat = [].concat(chat);
              newChat.splice(index,1)
              onChange({chat:newChat});
            }} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-15.svg?alt=media&token=d59e8719-fe0e-4333-bf3b-5dfaab428eee"/>
          <img onClick={()=>{
              var newChat = [].concat(chat);
              newChat[index].direction = (newChat[index].direction == "right" ? "left":"right")
              onChange({chat:newChat});
            }} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-26.svg?alt=media&token=2bad8e49-1999-44c0-bc7c-02674547e99c"/>
        </div>
    })()}
  </div>
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draggingIndex: null,
      chatText:""
    };
    this.onSort = this.onSort.bind(this);
  }

  onSort(sortedList) {
    console.log(sortedList);
  }

  render() {
    const {chatText} = this.state;
    const {chat,description,title,onToolClick,onChange} = this.props;
    return <div className={`${b["block"]} ${s["block__chat"]}`} >
      <input
        onChange={(e)=>{onChange({title:e.target.value})}}
        placeholder="Title goes here"
        className={`${b["block-title"]}`}
        value={title}
        type="text" />
      <div className={`${s["block-chatroom"]}`}>
        {chat.map((c,index)=>{
          return <ChatBubble key={index} c={c} index={index}/>
        })}
      </div>
      <div className={`${s["chat-input"]}`}>
        <input
          onChange={(e)=>{this.setState({chatText:e.target.value})}}
          placeholder="Add Message"
          className={`${b["block-caption"]}`}
          value={chatText}/>
        <svg
          onClick={()=>{
            if(chatText!="") {
              const lastChat = chat[chat.length-1]
              const lastDirect = lastChat == null ? "right":lastChat.direction;
              onChange({chat:chat.concat([{text:chatText,direction:lastDirect}])});
              this.setState({chatText:""})
            }
          }}
          width="15"
          height="13"
          viewBox="0 0 19 15" xmlns="http://www.w3.org/2000/svg"><path d="M18.999 7.472v-.36500000000000005l-.04-.057-.047-.057-6.333-6.776c-.304-.289-.773-.289-1.077 0-.292.313-.292.806 0 1.12l5.003 5.356h-15.714c-.437 0-.792.363-.792.812 0 .448.354.812.792.812h15.658l-5.074 5.348c-.292.313-.292.806 0 1.12.304.289.773.289 1.077 0l6.333-6.663.047-.057.047-.057v-.43800000000000006l.119-.097z" fill="#000"/></svg>
      </div>
      <input
        onChange={(e)=>{onChange({description:e.target.value})}}
        placeholder="Caption goes here"
        className={`${b["block-caption"]}`}
        value={description}/>
      <Tools onClick={onToolClick}/>
    </div>
  }
}

Chat.defaultProps = {
  chat:[]
}

export default Chat
