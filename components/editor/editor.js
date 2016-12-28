import React, { PropTypes } from 'react';
import s from './editor.css';
import EditorToolbar from './editorToolbar'
import Chatbar from '../chatbar'

import {
  Editor,
  createEditorState,
} from 'medium-draft';

const icon = (src,className)=>{
  console.log("here?",src)
  return ({}) => {
    return (<div className={className}><img src={require(src)}/></div>)
  }
}

const blockButtons = [{
  component: icon('./icons/h3.svg',"md-RichEditor-customButton"),
  label: "Bl",
  style: 'header-three',
  description: "Header",
},{
  component: icon('./icons/quote.svg',"md-RichEditor-customButton"),
  label: "Bl",
  style: 'blockquote',
  description: "Quote",
},
{
  component: icon('./icons/list.svg',"md-RichEditor-customButton"),
  label: "LI",
  style: 'ordered-list-item',
  description: "List",
},
{
  component: icon('./icons/bulletpoints.svg',"md-RichEditor-customButton"),
  label: "OL",
  style: 'unordered-list-item',
  description: "Bullet Points",
}
]

const inlineButtons = [
{
  label: 'B',
  style: 'BOLD',
  icon: 'bold',
  description: 'Bold',
},
{
  label: 'U',
  style: 'UNDERLINE',
  component: icon('./icons/underline.svg',"md-RichEditor-customButton"),
  icon: 'underline',
  description: 'Underline',
},
{
  label: 'Hi',
  style: 'HIGHLIGHT',
  component: icon('./icons/highlight.svg',"md-RichEditor-customButton"),
  description: 'Highlight selection',
},{
  label: '#',
  style: "hyperlink",
  icon: 'link',
  description: 'Add a link',
}]

const sideButtons = [{
  title: 'Image',
  component: icon('./icons/image.svg',"md-side-button")
},
{
  title: 'Icon',
  component: icon('./icons/icon.svg',"md-side-button")
},
{
  title: 'Project',
  component: icon('./icons/project.svg',"md-side-button")
}
]

const linkComponent = icon('./icons/link.svg',"md-RichEditor-customButton");

class EditorComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editorState: createEditorState(),
      currentTool: null
    };
    this.onChange = (editorState) => this.setState({editorState});
  }

  componentDidMount() {
    this.refs.editor.focus();
  }

  render() {
    const {} = this.props;
    const {editorState,currentTool} = this.state;
    return (
      <div className={`${s["editor"]}`}>
        <div className={`${s["editor-wrapper"]}`}>
          <div className={`${s["editor-core-wrapper"]}`}>
            <input type="text" placeholder="A great story awaits" className={`${s["editor-introduction"]}`}/>
            <Editor
              ref="editor"
              editorState={editorState}
              onChange={this.onChange}
              placeholder="May the force be with you"
              sideButtons={sideButtons}
              blockButtons={blockButtons}
              inlineButtons={inlineButtons}
              linkComponent={linkComponent}
            />
          </div>
        </div>
        <div className={`${s["editor-chatbar"]}`}>
          <Chatbar type="icon" props={{instruct:"List type",icons:[{src:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/icons%2Fclothes-01.svg?alt=media&token=7261cf03-befd-4acd-8ead-dba43fc04d3e",key:"animal"}]}}/>
        </div>
      </div>
    )
  }
}

export default EditorComponent;
