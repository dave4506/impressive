import React, { PropTypes } from 'react';
import s from './tools.css';
import ReactTooltip from 'react-tooltip'

class Tools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addButton:false
    };
  }
  render() {
    const {addButton} = this.state;
    const {onClick,tools} = this.props;
    return <div className={`${s["toolbar"]}`}>
      {tools.map((t,i)=>{
        return <div key={i} onClick={()=>{onClick(t.title)}}>
          <img data-tip data-for={`${t.title}ToolButton`} className={`${s["toolbar-icon"]}`} src={t.src}/>
          <ReactTooltip place="bottom" id={`${t.title}ToolButton`} effect='solid'>
            <span className={`${s["block-tooltip"]}`}>{t.publicTitle}</span>
          </ReactTooltip>
        </div>
      })}
    </div>
  }
}

export default Tools
