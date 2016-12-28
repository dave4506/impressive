import React, { PropTypes } from 'react';
import s from './editortoolbar.css';

const icon = (src,isText,publicText,key,textSymbol) => {
  return {
    publicText,
    key,
    element: ({currentTool,currentHover,onClick,onMouseEnter,onMouseLeave})=>{
      if(isText)
        return (<div onClick={()=>{onClick(key)}} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter} onClick={()=>{onClick(key)}} className={`${s["editor-icon"]} ${s["editor-icon__" + ((currentTool==key || currentHover==key) ? "current" : "unactive")]}`}>{textSymbol}</div>)
      else
        return (<div onClick={()=>{onClick(key)}} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter} className={`${s["editor-icon"]} ${s["editor-icon__" + ((currentTool==key || currentHover==key) ? "current" : "unactive")]}`}><img src={src}/></div>)
    }
  }
}

const icons = [
  icon(null,true,"Header 1","header-one","H1"),
  icon(null,true,"Header 2","header-two","H2"),
  //icon(require('./icons/video.svg'),false,"Embed Video","video"),
  icon(require('./icons/icon.svg'),false,"Insert Sticker","sticker"),
  icon(require('./icons/quote.svg'),false,"Insert Quote","blockquote"),
  icon(require('./icons/link.svg'),false,"Insert Link","link"),
  icon(require('./icons/list.svg'),false,"Insert List","list"),
  icon(require('./icons/project.svg'),false,"Insert Project","project")
]

class EditorToolbar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentHover:null
    }
  }

  render() {
    const {currentHover} = this.state;
    const {onClick,currentTool} = this.props;
    const currentActiveKey = currentHover || currentTool;
    const currentActive = icons.find((i)=>{return i.key === currentActiveKey})
    const currentPublicText = currentActive != null ? currentActive.publicText : "    "
    return (
      <div className={`${s["editor-toolbar"]}`}>
        {icons.map((icon,i)=>{
          const IconEle = icon.element;
          const resetCurrent = ()=>{this.setState({currentHover:null,currentPublicText:null})};
          const changeCurrent = ()=>{this.setState({currentHover:icon.key})};
          return <IconEle onClick={onClick} onMouseLeave={resetCurrent} onMouseEnter={changeCurrent} key={icon.key} currentTool={currentTool} currentHover={currentHover}/>
        })}
        <div className={`${s["editor-toolbar-text"]}`}>{currentPublicText}</div>
      </div>
    )
  }
}

export default EditorToolbar;
