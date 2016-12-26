import React, { PropTypes } from 'react';
import s from './editor.css';

const icon = (src,isText,publicText,key) => {
  return {
    publicText,
    key,
    element: ({current,onClick,onMouseEnter,onMouseLeave})=>{
      if(isText)
        return (<div onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter} onClick={()=>{onClick(key)}} className={`${s["editor-icon"]} ${s["editor-icon__" + (current==key ? "current" : "unactive")]}`}>{key}</div>)
      else
        return (<div onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter} className={`${s["editor-icon"]} ${s["editor-icon__" + (current==key ? "current" : "unactive")]}`}><img src={src}/></div>)
    }
  }
}

const icons = [
  icon(null,true,"Header 1","h1"),
  icon(null,true,"Header 2","h2"),
  icon(require('./icons/video.svg'),false,"Embed Video","video"),
  icon(require('./icons/icon.svg'),false,"Insert Sticker","sticker"),
  icon(require('./icons/quote.svg'),false,"Insert Quote","quote"),
  icon(require('./icons/link.svg'),false,"Insert Link","link"),
  icon(require('./icons/list.svg'),false,"Insert List","list"),
  icon(require('./icons/project.svg'),false,"Insert Project","project")
]

class EditorToolbar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentTool:"h1",
      currentPublicText:"Header 1"
    }
  }

  render() {
    const {currentTool,currentPublicText} = this.state;
    //const {currentTool} = this.props;
    return (
      <div className={`${s["editor-toolbar"]}`}>
        {icons.map((icon,i)=>{
          const IconEle = icon.element;
          const resetCurrent = ()=>{this.setState({currentTool:"",currentPublicText:""})};
          const changeCurrent = ()=>{this.setState({currentTool:icon.key,currentPublicText:icon.publicText})};
          return <IconEle onMouseLeave={resetCurrent} onMouseEnter={changeCurrent} key={icon.key} current={currentTool}/>
        })}
        <div className={`${s["editor-toolbar-text"]}`}>{currentPublicText}</div>
      </div>
    )
  }
}

export default EditorToolbar;
