import React, { PropTypes } from 'react';
import b from './block.css';
import s from './links.css';
import Columns from './columns'

const link = ({title,text,linkSrc},onDelete,onChange,i) => {
  return <div className={`${s["block-link"]}`}>
    <h1 className={`${s["block-link-number"]}`}>{i}</h1>
    <div className={`${s["block-link-text-group"]}`}>
      <input
        onChange={(e)=>{onChange({title:e.target.value})}}
        placeholder="Title goes here"
        className={`${s["block-link-title"]}`}
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
        className={`${s["block-link-text"]}`}
        value={text}
        type="text"/>
    </div>
    <div className={`${s["block-link-column-close"]}`}>
      <img onClick={()=>{onDelete()}} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-15.svg?alt=media&token=d59e8719-fe0e-4333-bf3b-5dfaab428eee"/>
    </div>
  </div>
}

class Links extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onColumnAdd = this.onColumnAdd.bind(this);
    this.onLinkChange = this.onLinkChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onLinkAdd = this.onLinkAdd.bind(this);
  }

  onColumnAdd() {
    const {links,onChange} = this.props;
    onChange({links:links.concat([[{title:"",text:"",linkSrc:""}]])});
  }

  onLinkAdd(index) {
    const {links,onChange} = this.props;
    const newLinks = [].concat(links);
    newLinks[index] = newLinks[index].concat([{title:"",text:"",linkSrc:""}])
    onChange({links:newLinks});
  }

  onDelete(colindex,index) {
    return () => {
      const {links,onChange} = this.props;
      const newLinks = [].concat(links);
      const newLinkColumn = [].concat(newLinks[colindex])
      newLinkColumn.splice(index,1)
      newLinks[colindex] = newLinkColumn
      if(newLinks[colindex].length == 0)
        newLinks.splice(colindex,1)
      onChange({links:newLinks});
    }
  }

  onLinkChange(colindex,index) {
    return (value) => {
      const {links,onChange} = this.props;
      const newLinks = [].concat(links);
      const newLinkColumn = [].concat(newLinks[colindex])
      newLinkColumn[index] = Object.assign({},newLinkColumn[index],value)
      newLinks[colindex] = newLinkColumn
      if(newLinks[colindex].length == 0)
        newLinks.splice(colindex,1)
      onChange({links:newLinks});
    }
  }

  render() {
    const {title,description,onToolClick,onChange,links} = this.props;
    var i = 0;
    const columns = links.map((li,colindex)=>{
      return <div className={`${s["block-link-column"]}`}>
        {li.map((l,index)=>{
          i++;
          return <div key={i}>
            {link(l,this.onDelete(colindex,index),this.onLinkChange(colindex,index),i)}
            </div>
        })}
        <div onClick={()=>{this.onLinkAdd(colindex)}} className={`${s["block-link-column-add"]}`}>
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

Links.defaultProps = {
  links:[]
}

export default Links
