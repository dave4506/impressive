import React, { PropTypes } from 'react';
import b from './block.css';
import s from './iconRow.css';
import Tools from '../tools';
import IconSelector from '../tools/icon';

const LinkInput = ({link,onChange,onDelete}) => {
  return (<div className={`${s["icon-link"]}`}>
    <button onClick={onDelete} className={`${s["icon-link-delete"]}`}>Delete</button>
    <input
    onChange={(e)=>{onChange(e.target.value)}}
    placeholder="Link redirect on click"
    className={`${s["icon-link-input"]}`}
    value={link}
    type="text" />
  </div>)
}

class IconRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addIcon = this.addIcon.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onLink = this.onLink.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  addIcon() {
    const {icons,onChange} = this.props;
    onChange({icons:icons.concat([{src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fothers-08.svg?alt=media&token=d7abe544-4ba4-4dd1-8d44-413ee17b8032",link:""}])})
  }

  onDelete(index) {
    return () => {
      const {icons,onChange} = this.props;
      const newIcons = [].concat(icons);
      newIcons.splice(index,1);
      onChange({icons:newIcons})
    }
  }

  onSelect(index) {
    return (src) => {
      const {icons,onChange} = this.props;
      const newIcons = [].concat(icons);
      newIcons.splice(index,1,Object.assign({},newIcons[index],{src}));
      onChange({icons:newIcons})
    }
  }

  onLink(index) {
    return (link) => {
      const {icons,onChange} = this.props;
      const newIcons = [].concat(icons);
      newIcons.splice(index,1,Object.assign({},newIcons[index],{link}));
      onChange({icons:newIcons})
    }
  }

  render() {
    const {icons,description,title,onToolClick,onChange} = this.props;
    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-icon-row"]}`} >
      <input
        onChange={(e)=>{onChange({title:e.target.value})}}
        placeholder="Title goes here"
        className={`${b["block-title"]}`}
        value={title}
        type="text" />
      <div className={`${s["block-icon-row-gallery"]}`}>
        {icons.map((icon,i)=>{
          return <div key={i} style={{position:"relative"}}>
            <IconSelector
              extra={<LinkInput onDelete={this.onDelete(i)} onChange={this.onLink(i)} link={icon.link}/>}
              current={icon.src}
              onSelect={this.onSelect(i)}
              >
              <img className={`${s["block-icon"]}`} src={icon.src} key={i}/>
            </IconSelector>
          </div>
        })}
      </div>
      <p className={`${b["block-caption"]}`}>Click on icon to change it.</p>
      <input
        onChange={(e)=>{onChange({description:e.target.value})}}
        placeholder="Caption goes here"
        className={`${b["block-caption"]}`}
        value={description}
        type="text" />
      <Tools tools={[{
        title:"DELETE",
        publicTitle:"Delete above block",
        src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-15.svg?alt=media&token=d59e8719-fe0e-4333-bf3b-5dfaab428eee"
      },{
        title:"ADD",
        publicTitle:"Add a icon",
        src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-22.svg?alt=media&token=cb52a56f-d621-4b04-b4b6-d2f141b902e8"
      }]} onClick={(tool)=>{if(tool!="ADD"){onToolClick(tool)}else{this.addIcon()}}}/>
    </div>
  }
}

IconRow.defaultProps = {
  icons:[]
}

export default IconRow
