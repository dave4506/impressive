import React, { PropTypes } from 'react';
import s from './chatbar.css';

const statusClass = (indicator) => {
  switch (indicator) {
    case "loading":
      return s["chatbar__loading"]
    case "success":
      return s["chatbar__success"]
    case "error":
      return s["chatbar__error"]
    case "warning":
      return s["chatbar__warning"]
    case "disable":
      return s["chatbar__disable"]
    default:
      return s["chatbar__default"]
  }
}

class Chatbar extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const {subText,onSubmit,i,placeholder,status,second,secondPlaceholder} = this.props;
    return (
      <div className={`${s["chatbar"]} ${s["chatbar-standard"]}`}>
        <div className={`${statusClass(status.indicator)} ${s["chatbar-status"]} ${s["chatbar-status__" + (status ? "reveal":"hidden")]}`}>{status.text}</div>
        <div className={`${s["chatbar-spacer"]}`}></div>
        <input placeholder={placeholder} type="text" className={`${s["chatbar-input"]} ${s["chatbar-standard-input"]}`}/>
        <div className={`${s["chatbar-send"]} ${s["chatbar-send-second__"+(second ? "open":"close")]}`}>
          <div className={`${s["chatbar-second-input"]}`}>
            <input placeholder={secondPlaceholder} type="text" className={`${s["chatbar-input"]}`}/>
          </div>
          <svg width="19" height="15" viewBox="0 0 19 15" xmlns="http://www.w3.org/2000/svg"><path d="M18.999 7.472v-.36500000000000005l-.04-.057-.047-.057-6.333-6.776c-.304-.289-.773-.289-1.077 0-.292.313-.292.806 0 1.12l5.003 5.356h-15.714c-.437 0-.792.363-.792.812 0 .448.354.812.792.812h15.658l-5.074 5.348c-.292.313-.292.806 0 1.12.304.289.773.289 1.077 0l6.333-6.663.047-.057.047-.057v-.43800000000000006l.119-.097z" fill="#000"/></svg>
        </div>
      </div>
    )
  }
}

export default Chatbar;
