import React, { PropTypes } from 'react';
import icon from './icon'

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
}]

export default blockButtons
