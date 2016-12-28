import React, { PropTypes } from 'react';
import icon from './icon'
import ImageButton from './imageButton'
import BreakButton from './breakButton'

const sideButtons = [{
  title: 'Image',
  component: ImageButton
},
{
  title: 'Icon',
  component: icon('./icons/icon.svg',"md-side-button")
}]


export default sideButtons
