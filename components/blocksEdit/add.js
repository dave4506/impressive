import React, { PropTypes } from 'react';
import b from './block.css';
import s from './add.css';
import ReactTooltip from 'react-tooltip'

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addButton:false
    };
  }
  render() {
    const {addButton} = this.state;
    const {onClick,hidden} = this.props;
    return <div className={`${b["block"]} ${b["block__standard-width"]} ${s["block-add"]} ${s["block-add__"+(hidden ? "hidden":"reveal")]}`}>
      <div className={`${s["block-tools"]}`}>
        <svg onClick={()=>{this.setState({addButton:!addButton})}} className={`${s["block-add-button"]} ${s["block-add-button__"+(addButton ? "open":"close")]}`} width="26" height="26" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M24 21.172l-4.956-4.956c-.779-.779-2.041-.775-2.822.006-.786.786-.784 2.045-.006 2.822l4.956 4.956-4.956 4.956c-.778.778-.78 2.036.006 2.822.781.781 2.043.785 2.822.006l4.956-4.956 4.956 4.956c.779.779 2.041.775 2.822-.006.786-.786.784-2.045.006-2.822l-4.956-4.956 4.956-4.956c.778-.778.78-2.036-.006-2.822-.781-.781-2.043-.785-2.822-.006l-4.956 4.956zm0 22.828c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20zm0-4c-8.837 0-16-7.163-16-16s7.163-16 16-16 16 7.163 16 16-7.163 16-16 16z" fill="#000"/></svg>
        <div onClick={()=>{this.setState({addButton:false})}} className={`${s["block-buttons"]} ${s["block-buttons__"+(addButton ? "open":"close")]}`}>
          <div className={`${s["block-buttons-row"]}`}>
            <div onClick={()=>{onClick("PROFILE")}} >
              <img data-tip data-for='profileAddButton' className={`${s["block-buttons-add"]}`} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fothers-27.svg?alt=media&token=061e1025-1479-49b3-a9d5-efbc187b1c46"/>
              <ReactTooltip place="bottom" id='profileAddButton' effect='solid'>
                <span className={`${b["block-tooltip"]}`}>Profile</span>
              </ReactTooltip>
            </div>
            <div onClick={()=>{onClick("GALLERY")}}>
              <img data-tip data-for='galleryAddButton' className={`${s["block-buttons-add"]}`} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fui-58.svg?alt=media&token=3107680f-762c-4320-9f70-b1dd3dfbceed"/>
              <ReactTooltip place="bottom" id='galleryAddButton' effect='solid'>
                <span className={`${b["block-tooltip"]}`}>Gallery</span>
              </ReactTooltip>
            </div>
            <div onClick={()=>{onClick("DESCRIPTION")}}>
              <img data-tip data-for='descriptionAddButton' className={`${s["block-buttons-add"]}`} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Ftext-03.svg?alt=media&token=79595bcf-6c9e-4cd0-96d0-060940be89b0"/>
              <ReactTooltip place="bottom" id='descriptionAddButton' effect='solid'>
                <span className={`${b["block-tooltip"]}`}>Description</span>
              </ReactTooltip>
            </div>
          </div>
          <div className={`${s["block-buttons-row"]}`}>
            <div onClick={()=>{onClick("QUOTE")}}>
              <img data-tip data-for='quoteAddButton' className={`${s["block-buttons-add"]}`} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Ftext-06.svg?alt=media&token=41175253-946b-4a43-9fa0-4caaaf5b639b"/>
              <ReactTooltip place="bottom" id='quoteAddButton' effect='solid'>
                <span className={`${b["block-tooltip"]}`}>Quote</span>
              </ReactTooltip>
            </div>
            <div onClick={()=>{onClick("CHAT")}}>
              <img data-tip data-for='chatAddButton' className={`${s["block-buttons-add"]}`} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fmail-12.svg?alt=media&token=1d39e26c-85c8-4332-8d58-169615f4a05e"/>
              <ReactTooltip place="bottom" id='chatAddButton' effect='solid'>
                <span className={`${b["block-tooltip"]}`}>Chat</span>
              </ReactTooltip>
            </div>
            <div onClick={()=>{onClick("LINKS")}}>
              <img data-tip data-for='linksAddButton' className={`${s["block-buttons-add"]}`} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Ftext-08.svg?alt=media&token=ee2823b2-46ae-4872-8e86-d1458ed050f0"/>
              <ReactTooltip place="bottom" id='linksAddButton' effect='solid'>
                <span className={`${b["block-tooltip"]}`}>Links</span>
              </ReactTooltip>
            </div>
          </div>
          <div className={`${s["block-buttons-row"]}`}>
            <div onClick={()=>{onClick("ICONS")}}>
              <img data-tip data-for='featureAddButton' className={`${s["block-buttons-add"]}`} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Ffinance-33.svg?alt=media&token=3b33eace-34cd-4fab-bffe-9bc99f150ad4"/>
              <ReactTooltip place="bottom" id='featureAddButton' effect='solid'>
                <span className={`${b["block-tooltip"]}`}>Features</span>
              </ReactTooltip>
            </div>
            <div onClick={()=>{onClick("PROJECT")}}>
              <img data-tip data-for='projectAddButton' className={`${s["block-buttons-add"]}`} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Ffinance-32.svg?alt=media&token=0d6a7dbb-2ccf-4ccb-b80a-827dbb13a278"/>
              <ReactTooltip place="bottom" id='projectAddButton' effect='solid'>
                <span className={`${b["block-tooltip"]}`}>Project</span>
              </ReactTooltip>
            </div>
            <div onClick={()=>{onClick("CTA")}}>
              <img data-tip data-for='ctaAddButton' className={`${s["block-buttons-add"]}`} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fsports-07.svg?alt=media&token=b26f184d-f6e0-4cce-8872-19f0f871a1b3"/>
              <ReactTooltip place="bottom" id='ctaAddButton' effect='solid'>
                <span className={`${b["block-tooltip"]}`}>Call to action</span>
              </ReactTooltip>
            </div>
          </div>
          <div onClick={()=>{onClick("ICON_ROW")}} className={`${s["block-buttons-row"]}`}>
            <div>
              <img data-tip data-for='iconsAddButton' className={`${s["block-buttons-add"]}`} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fothers-08.svg?alt=media&token=d7abe544-4ba4-4dd1-8d44-413ee17b8032"/>
              <ReactTooltip place="bottom" id='iconsAddButton' effect='solid'>
                <span className={`${b["block-tooltip"]}`}>Icons Row</span>
              </ReactTooltip>
            </div>
            <div>
              <img data-tip data-for='lineBreakAddButton' className={`${s["block-buttons-add"]}`} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fcommon-04.svg?alt=media&token=b1a6bf92-0ff0-4c3d-b3d7-118b31184c95"/>
              <ReactTooltip place="bottom" id='lineBreakAddButton' effect='solid'>
                <span className={`${b["block-tooltip"]}`}>Line Break</span>
              </ReactTooltip>
            </div>
            <div>
              <img data-tip data-for='headerAddButton' className={`${s["block-buttons-add"]}`} src="https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Ftext-04.svg?alt=media&token=d1083413-6720-4fe9-bb26-77eedcf2564b"/>
              <ReactTooltip place="bottom" id='headerAddButton' effect='solid'>
                <span className={`${b["block-tooltip"]}`}>Header Text</span>
              </ReactTooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default Add
