import React, { PropTypes } from 'react';
import b from './block.css';
import s from './iconRow.css';

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

class IconRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {icons,description,title} = this.props;
    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-icon-row"]}`} >
      <p className={`${b["block-title"]}`}>{title}</p>
      <div className={`${s["block-icon-row-gallery"]}`}>
        {icons.map((icon,i)=>{
          return <img onClick={()=>{openInNewTab(icon.link)}} className={`${s["block-icon"]}`} src={icon.src} key={i}/>
        })}
      </div>
      <p className={`${b["block-caption"]}`}>{description}</p>
    </div>
  }
}

export default IconRow
