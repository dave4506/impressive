import React, { PropTypes } from 'react';
import b from './block.css';
import s from './links.css';
import Columns from './columns'

const link = ({title,text,linkSrc},i) => {
  return <div className={`${s["block-link"]}`}>
    <h1 className={`${s["block-link-number"]}`}>{i}</h1>
    <div className={`${s["block-link-text-group"]}`}>
      <h2 className={`${s["block-link-title"]}`}>{title}</h2>
      <p className={`${s["block-link-text"]}`}>{text}</p>
      {(()=>{
        if(linkSrc.length != 0)
          return <a href={linkSrc}>Check out</a>
      })()}
    </div>
  </div>
}

class Links extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {links,description,title} = this.props;
    var i = 0;
    const columns = links.map((li)=>{
      return <div>
        {li.map((l)=>{
          i++;
          return <div key={i}>{link(l,i)}</div>
        })}
      </div>
    });
    return <Columns
      columns={columns}
      description={description}
      title={title}
    />
  }
}

export default Links
