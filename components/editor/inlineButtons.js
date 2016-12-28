import React, { PropTypes } from 'react';
import icon from './icon'

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

export default inlineButtons
