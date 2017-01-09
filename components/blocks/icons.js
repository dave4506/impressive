import React, { PropTypes } from 'react';
import b from './block.css';
import s from './icons.css';
import Columns from './columns'

const icon = ({src,title,text,link}) => {

  return <div className={`${s["block-icon"]}`}>
    <img className={`${s["block-icon-img"]}`} src={src}/>
    <div className={`${s["block-icon-text-group"]}`}>
      <h2 className={`${s["block-icon-title"]}`}>{title}</h2>
      <p className={`${s["block-icon-text"]}`}>{text}</p>
    </div>
  </div>
}

class Icons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {icons,description,title} = this.props;
    const columns = icons.map((iconCl)=>{
      return <div>
        {iconCl.map((i,index)=>{
          return <div key={index}>{icon(i)}</div>
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

export default Icons
