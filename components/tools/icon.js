import React, { PropTypes } from 'react';
import s from './tools.css';
import ReactTooltip from 'react-tooltip'
import {Overlay} from 'react-overlays';
import {connect} from 'react-redux';
import {iconCatLoad,iconLoad} from '../../core/actions/icon';
import {findDOMNode} from 'react-dom';
import Loader from '../loader/simpleLoader'

class IconSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status:"CAT",
      selected:{},
      key:""
    };
  }

  render() {
    const {status,selected,key} = this.state;
    const {cat,icons,current,iconLoad,onSelect,onHide,extra} = this.props;
    return <div className={`${s["icon-selector"]}`}>
      <div className={`${s["icon-extra"]}`}>
        {extra}
      </div>
      <div className={`${s["icon-selected"]}`}>
        <p className={`${s["icon-title"]}`}>Current:</p>
        <div className={`${s["icon"]}`}>
          <img src={current}/>
        </div>
      </div>
      <div onClick={onHide} className={`${s["close"]}`}>
        <img src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fcommon-01.svg?alt=media&token=cf7deee3-d9a8-4e14-b9b0-a6deaf98bdaf"/>
      </div>
      {(()=>{
        if(status=="ICON" && icons[key] != null)
          return (
            <div>
              <p className={`${s["icon-title"]}`}><span className={`${s["category"]}`} onClick={()=>{this.setState({status:"CAT"});}} >Categories</span> / {selected.publicTitle}:</p>
              <div className={`${s["icon-category"]}`}>
                {icons[key].map((icon,i)=>{
                  return (
                    <div onClick={()=>{onSelect(icon)}} key={i} className={`${s["icon"]}`}>
                      <img src={icon}/>
                    </div>
                  )
                })}
              </div>
            </div>)
        else if(status=="ICON")
          return (<div className={`${s["icon-loader"]}`}>
              <Loader width="15px" height="15px" color="#000" indicator="LOADING"/>
            </div>)
      })()}
      {(()=>{
        if(status=="CAT")
          return (
            <div>
              <p className={`${s["icon-title"]}`}>Categories:</p>
              <div className={`${s["icon-category"]}`}>
                {Object.keys(cat).map((k,i)=>{
                  const c = cat[k];
                  return (
                    <div onClick={()=>{this.setState({status:"ICON",selected:c,key:k});iconLoad(k)}} key={i} className={`${s["icon"]}`}>
                      <img src={c.url}/>
                      <p>{c.publicTitle}</p>
                    </div>
                  )
                })}
              </div>
            </div>)
      })()}
    </div>
  }
}

class IconOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay:false
    };
    this.onToggle = this.onToggle.bind(this);
  }

  componentWillMount() {
    const {icon} = this.props;
    if(icon.catStatus == "INIT")
      this.props.iconCatLoad()
  }

  onToggle(e) {
    this.setState({overlay:true});
  }

  render() {
    const {onToggle} = this;
    const {overlay} = this.state;
    const {children,icon,iconLoad,onSelect,current,extra} = this.props;
    return <div className={`${s["icon-overlay"]}`}>
      <div onClick={onToggle}>
        {children}
      </div>
      <Overlay
        show={overlay}
        placement={"bottom"}
        container={this}
        target={ props => findDOMNode(this.refs.target)}
      >
        <IconSelector extra={extra} current={current} onSelect={onSelect} iconLoad={iconLoad} cat={icon.cat} icons={icon.icons} onHide={() => this.setState({ overlay: false })}/>
      </Overlay>
    </div>
  }
}

IconSelector.defaultProps = {
  cat:{},
  selected:{}
};

const mapStateToProps = (state, ownProps) => {
  return {
    icon:state.get("icon").toJS()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    iconCatLoad: ()=>{
      dispatch(iconCatLoad())
    },
    iconLoad: (key)=>{
      console.log(key)
      dispatch(iconLoad(key))
    }
  }
}

const IconOverlayRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(IconOverlay)

export default IconOverlayRedux
