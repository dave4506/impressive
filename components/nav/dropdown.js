import React, { PropTypes } from 'react';
import s from './nav.css';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {links,onClick,accordion} = this.props;
    return (
      <div style={{height:(accordion ? '6rem':'0px')}} className={`${s["dropdown"]} ${s["dropdown" + (accordion ? "open":"close")]}`}>
        <div className={`${s["dropdown-inner"]}`}>
          {links.map((l,i)=>{
            return (<button key={i} onClick={()=>{onClick(i)}} className={`${s["navbar-links"]}`}>{l}</button>)
          })}
        </div>
      </div>
    )
  }
}

export default Dropdown;
