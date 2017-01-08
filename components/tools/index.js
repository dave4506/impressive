import React, { PropTypes } from 'react';
import s from './tools.css';
import ReactTooltip from 'react-tooltip'
import shortid from 'shortid';

class Tools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addButton:false,
      id:shortid.generate()
    };
  }

  render() {
    const {addButton,id} = this.state;
    const {onClick,tools} = this.props;
    return <div className={`${s["toolbar"]}`}>
      {tools.map((t,i)=>{
        return <div key={i} onClick={()=>{onClick(t.title)}}>
          <img data-tip data-for={`${t.title}-${id}-ToolButton`} className={`${s["toolbar-icon"]} ${t.customClass || ''}`} src={t.src}/>
          <ReactTooltip place="bottom" id={`${t.title}-${id}-ToolButton`} effect='solid'>
            <span className={`${s["block-tooltip"]}`}>{t.publicTitle}</span>
          </ReactTooltip>
        </div>
      })}
    </div>
  }
}

Tools.defaultProps = {
  tools:[{
    title:"DELETE",
    publicTitle:"Delete above block",
    src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-15.svg?alt=media&token=d59e8719-fe0e-4333-bf3b-5dfaab428eee"
  }]
};

export default Tools
