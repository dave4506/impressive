import React, { PropTypes } from 'react';
import s from './nav.css';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      accordion:false
    }
  }

  componentDidMount() {
    if(this.props.defaultAccordion)
      this.setState({accordion:this.props.defaultAccordion})
  }

  render() {
    const {links,onClick} = this.props;
    const {accordion} = this.state;
    return (
      <div style={{height:(accordion ? '6rem':'0px')}} className={`${s["dropdown"]} ${s["dropdown" + (accordion ? "open":"close")]}`}>
        <div className={`${s["dropdown-inner"]}`}>
          {links.map((l,i)=>{
            return (<button key={i} onClick={()=>{onClick(i)}} className={`${s["dropdown-links"]}`}>{l}</button>)
          })}
        </div>
      </div>
    )
  }
}

export default Dropdown;
