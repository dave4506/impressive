import React, { PropTypes } from 'react';
import s from './list.css';
import ListItem from './listItem';
import Image from '../image/image';
import Loading from '../loader/simpleLoader';

import {connect} from 'react-redux';

const Header = (props) => {
  if(props.editable)
    return <EditHeader {...props}/>
  else
    return <EditableHeader {...props}/>
}

class EditHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {photoStatus,editable,src,author,subtext,onClick,link,onChange} = this.props;
    return (
      <ListItem>
        <div className={`${s["list-header"]}`}>
          <div className={`${s["list-header-profile-wrapper"]}`}>
            <div onClick={()=>{if(photoStatus!="LOADING") this.refs.fileUploader.click()}} className={`${s["list-header-profile-overlay"]}`}>
              {(()=>{
                if(photoStatus=="LOADING" || photoStatus=="ERROR")
                  return <Loading width="28px" height="28px" color="#FFF" indicator={photoStatus}/>
                else
                  return <img width="28" height="28" src={require('./icons/profile.svg')}/>
              })()}
              <input accept="image/*" onChange={(e)=>{onChange(e.target.files[0],"photoURL")}} type="file" ref="fileUploader" style={{display: "none"}} />
            </div>
            <img className={`${s["list-header-profile"]}`} src={src}/>
          </div>
          <div className={`${s["list-header-input"]}`}>
            <input placeholder="short bio of you" value={subtext} onChange={(e)=>{onChange(e.target.value,"subtext")}} type="text" className={`${s["list-header-input"]}`}/>
            <input placeholder="link to your website" value={link} onChange={(e)=>{onChange(e.target.value,"link")}} type="text" className={`${s["list-header-input"]}`}/>
          </div>
          <div className={`${s["list-header-links"]}`}>
            <svg className={`${s["list-header-link"]} ${s["list-header-link__"+(photoStatus=="LOADING" ? "disable":"enable")]}`} onClick={()=>{if(photoStatus!="LOADING") onClick("done")}} width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>theicons.co/svg/ui-21</title><desc>Created with Sketch.</desc><path d="M24 44c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20zm0-4c-8.837 0-16-7.163-16-16s7.163-16 16-16 16 7.163 16 16-7.163 16-16 16zm-4.414-8.586c.781.781 2.047.781 2.828 0l11-11c.781-.781.781-2.047 0-2.828-.781-.781-2.047-.781-2.828 0l-9.586 9.614-4.586-4.614c-.781-.781-2.047-.781-2.828 0-.781.781-.781 2.047 0 2.828l6 6z" fill="#000"/></svg>
            <svg className={`${s["list-header-link"]}`} onClick={()=>{onClick("close")}} width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>theicons.co/svg/ui-24</title><desc>Created with Sketch.</desc><path d="M24 21.172l-4.956-4.956c-.779-.779-2.041-.775-2.822.006-.786.786-.784 2.045-.006 2.822l4.956 4.956-4.956 4.956c-.778.778-.78 2.036.006 2.822.781.781 2.043.785 2.822.006l4.956-4.956 4.956 4.956c.779.779 2.041.775 2.822-.006.786-.786.784-2.045.006-2.822l-4.956-4.956 4.956-4.956c.778-.778.78-2.036-.006-2.822-.781-.781-2.043-.785-2.822-.006l-4.956 4.956zm0 22.828c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20zm0-4c-8.837 0-16-7.163-16-16s7.163-16 16-16 16 7.163 16 16-7.163 16-16 16z" fill="#000"/></svg>
          </div>
        </div>
      </ListItem>
    )
  }
}

const EditableHeader = ({editable,src,author,subtext,onClick,link}) => {
  return (
    <ListItem>
      <div className={`${s["list-header"]}`}>
        <div className={`${s["list-header-profile-wrapper"]}`}>
          <img className={`${s["list-header-profile"]}`} src={src}/>
        </div>
        <div className={`${s["list-header-text"]}`}>
          <h1 className={`${s["list-header-author"]}`}>{author}</h1>
          <h4 className={`${s["list-header-subtext"]}`}>{subtext}</h4>
        </div>
        <div className={`${s["list-header-links"]}`}>
          <svg className={`${s["list-header-link"]}`} onClick={()=>{onClick("edit")}} width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>theicons.co/svg/others-45</title><desc>Created with Sketch.</desc><g fill="none"><path d="M11.086 31.228l-3.085 3.079.003 1.876c1.05-.36 2.259-.121 3.097.716.841.841 1.078 2.057.712 3.11l1.856.005 3.102-3.102-5.685-5.685zm2.831-2.826c6.618-6.607 16.424-16.396 16.425-16.395 0 0 5.668 5.667 5.67 5.665l-16.413 16.413-5.682-5.682zm17.598-23.227c1.561-1.56 4.093-1.558 5.656.004l5.668 5.668c1.562 1.562 1.564 4.093.003 5.654l-26.795 26.795c-.389.389-1.15.705-1.711.705h-8.332c-1.105 0-2.001-.89-2.001-2.001v-8.331c0-.556.32-1.326.705-1.711l26.809-26.782z" fill="#000"/></g></svg>
          <svg className={`${s["list-header-link"]}`} onClick={()=>{window.open(link, '_blank')}} width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>theicons.co/svg/ui-52</title><desc>Created with Sketch.</desc><path d="M28.249 16.922c.777-.777 2.035-.78 2.822.007.781.781.779 2.049.007 2.822l-11.327 11.327c-.777.777-2.035.78-2.822-.007-.781-.781-.779-2.049-.007-2.822l11.327-11.327zm-5.663 16.977l-5.657 5.657c-2.341 2.341-6.146 2.339-8.485 0-2.341-2.341-2.34-6.145 0-8.485l5.657-5.657c.781-.781.781-2.047 0-2.828-.781-.781-2.047-.781-2.828 0l-5.657 5.657c-3.902 3.902-3.904 10.238 0 14.142 3.901 3.901 10.239 3.903 14.142 0l5.657-5.657c.781-.781.781-2.047 0-2.828-.781-.781-2.047-.781-2.828 0zm14.142-8.485l5.657-5.657c3.903-3.903 3.901-10.241 0-14.142-3.904-3.904-10.24-3.902-14.142 0l-5.657 5.657c-.781.781-.781 2.047 0 2.828.781.781 2.047.781 2.828 0l5.657-5.657c2.34-2.34 6.144-2.341 8.485 0 2.339 2.339 2.341 6.145 0 8.485l-5.657 5.657c-.781.781-.781 2.047 0 2.828.781.781 2.047.781 2.828 0z" fill="#000"/></svg>
        </div>
      </div>
    </ListItem>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    photoStatus:state.get("profile").get("photoStatus")
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const HeaderRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderRedux;
