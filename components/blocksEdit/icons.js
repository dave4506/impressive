import React, { PropTypes } from 'react';
import b from './block.css';
import s from './icons.css';
import Columns from './columns'
import Tools from '../tools';
import IconSelector from '../tools/icon';

const iconComp = ({src,linkSrc,title,text},onDelete,onChange,i) => {
  return <div className={`${s["block-icon"]}`}>
    <IconSelector
      current={src}
      onSelect={(src)=>{onChange({src})}}>
      <img className={`${s["block-icon-img"]}`} src={src}/>
    </IconSelector>
    <div className={`${s["block-icon-text-group"]}`}>
      <input
        onChange={(e)=>{onChange({title:e.target.value})}}
        placeholder="Title goes here"
        className={`${s["block-icon-title"]}`}
        value={title}
        type="text"/>
      <input
        onChange={(e)=>{onChange({linkSrc:e.target.value})}}
        placeholder="Link goes here"
        style={{textAlign:"left",width:"100%"}}
        className={`${b["block-caption"]}`}
        value={linkSrc}
        type="text"/>
      <textarea
        onChange={(e)=>{onChange({text:e.target.value})}}
        placeholder="Description goes here"
        className={`${s["block-icon-text"]}`}
        value={text}
        type="text"/>
    </div>
    <div className={`${s["block-icon-column-close"]}`}>
      <img onClick={()=>{onDelete()}} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-15.svg?alt=media&token=d59e8719-fe0e-4333-bf3b-5dfaab428eee"/>
    </div>
  </div>
}

class Icons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onColumnAdd = this.onColumnAdd.bind(this);
  }

  onColumnAdd() {
    const {icons,onChange} = this.props;
    onChange({icons:icons.concat([[{linkSrc:"",src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fothers-08.svg?alt=media&token=d7abe544-4ba4-4dd1-8d44-413ee17b8032",title:"",text:""}]])});
  }

  onIconAdd(index) {
    const {icons,onChange} = this.props;
    const newIcons = [].concat(icons);
    newIcons[index] = newIcons[index].concat([{linkSrc:"",src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fothers-08.svg?alt=media&token=d7abe544-4ba4-4dd1-8d44-413ee17b8032",title:"",text:""}])
    onChange({icons:newIcons});
  }

  onDelete(colindex,index) {
    return () => {
      const {icons,onChange} = this.props;
      const newIcons = [].concat(icons);
      const newLinkColumn = [].concat(newIcons[colindex])
      newLinkColumn.splice(index,1)
      newIcons[colindex] = newLinkColumn
      if(newIcons[colindex].length == 0)
        newIcons.splice(colindex,1)
      onChange({icons:newIcons});
    }
  }

  onIconChange(colindex,index) {
    return (value) => {
      const {icons,onChange} = this.props;
      const newIcons = [].concat(icons);
      const newLinkColumn = [].concat(newIcons[colindex])
      newLinkColumn[index] = Object.assign({},newLinkColumn[index],value)
      newIcons[colindex] = newLinkColumn
      if(newIcons[colindex].length == 0)
        newIcons.splice(colindex,1)
      onChange({icons:newIcons});
    }
  }

  render() {
    const {title,description,onToolClick,onChange,icons} = this.props;
    const columns = icons.map((iconCl,colindex)=>{
      return <div>
        {iconCl.map((icon,index)=>{
          return <div key={index}>
            {iconComp(icon,this.onDelete(colindex,index),this.onIconChange(colindex,index),index)}
          </div>
        })}
        <div onClick={()=>{this.onIconAdd(colindex)}} className={`${s["block-icon-column-add"]}`}>
          <img src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-22.svg?alt=media&token=cb52a56f-d621-4b04-b4b6-d2f141b902e8"/>
        </div>
      </div>
    });
    return <Columns
      columns={columns}
      description={description}
      title={title}
      onChange={onChange}
      onAdd={this.onColumnAdd}
      onToolClick={onToolClick}
    />
  }
}

Icons.defaultProps = {
  icons:[]
}

export default Icons
