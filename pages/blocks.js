import React, { PropTypes } from 'react';

import ProfileEdit from '../components/blocksEdit/profile'
import QuoteEdit from '../components/blocksEdit/quote'
import GalleryEdit from '../components/blocksEdit/gallery'
import DescriptionEdit from '../components/blocksEdit/description'
import LinksEdit from '../components/blocksEdit/links'
import IconsEdit from '../components/blocksEdit/icons'
import CtaEdit from '../components/blocksEdit/cta'
import LineBreakEdit from '../components/blocksEdit/lineBreak'
import ChatEdit from '../components/blocksEdit/chat'
import IconRowEdit from '../components/blocksEdit/iconRow'
import ProjectEdit from '../components/blocksEdit/project'
import HeaderEdit from '../components/blocksEdit/header'
import TableEdit from '../components/blocksEdit/table'

import Profile from '../components/blocks/profile'
import Quote from '../components/blocks/quote'
import Gallery from '../components/blocks/gallery'
import Description from '../components/blocks/description'
import Links from '../components/blocks/links'
import Icons from '../components/blocks/icons'
import Cta from '../components/blocks/cta'
import LineBreak from '../components/blocks/lineBreak'
import Chat from '../components/blocks/chat'
import IconRow from '../components/blocks/iconRow'
import Project from '../components/blocks/project'
import Header from '../components/blocks/header'

import { BLOCKS } from '../core/constants'

export const Block = ({type,edit,props}) => {
  if(edit)
    switch (type) {
      case BLOCKS.PROFILE:
        return <ProfileEdit {...props}/>
      case BLOCKS.QUOTE:
        return <QuoteEdit {...props}/>
      case BLOCKS.GALLERY:
        return <GalleryEdit {...props}/>
      case BLOCKS.DESCRIPTION:
        return <DescriptionEdit {...props}/>
      case BLOCKS.LINKS:
        return <LinksEdit {...props}/>
      case BLOCKS.ICONS:
        return <IconsEdit {...props}/>
      case BLOCKS.CTA:
        return <CtaEdit {...props}/>
      case BLOCKS.LINE_BREAK:
        return <LineBreakEdit {...props}/>
      case BLOCKS.CHAT:
        return <ChatEdit {...props}/>
      case BLOCKS.ICON_ROW:
        return <IconRowEdit {...props}/>
      case BLOCKS.PROJECT:
        return <ProjectEdit {...props}/>
      case BLOCKS.HEADER:
        return <HeaderEdit {...props}/>
      case BLOCKS.TABLE:
        return <TableEdit {...props}/>
      case BLOCKS.INPUT:
        return <InputEdit {...props}/>
      default:
    }
  else
    switch (type) {
      case BLOCKS.PROFILE:
        return <Profile {...props}/>
      case BLOCKS.QUOTE:
        return <Quote {...props}/>
      case BLOCKS.GALLERY:
        return <Gallery {...props}/>
      case BLOCKS.DESCRIPTION:
        return <Description {...props}/>
      case BLOCKS.LINKS:
        return <Links {...props}/>
      case BLOCKS.ICONS:
        return <Icons {...props}/>
      case BLOCKS.CTA:
        return <Cta {...props}/>
      case BLOCKS.LINE_BREAK:
        return <LineBreak {...props}/>
      case BLOCKS.CHAT:
        return <Chat {...props}/>
      case BLOCKS.ICON_ROW:
        return <IconRow {...props}/>
      case BLOCKS.PROJECT:
        return <Project {...props}/>
      case BLOCKS.HEADER:
        return <Header {...props}/>
      case BLOCKS.TABLE:
        return <Table {...props}/>
      case BLOCKS.INPUT:
        return <Input {...props}/>
      default:
    }
}

export const defaultBlockProps = (type) => {
  switch (type) {
    case BLOCKS.PROFILE:
      return {
        profileSrc:"https://firebasestorage.googleapis.com/v0/b/impresssive-86554.appspot.com/o/default-profile-pic.png?alt=media&token=af347836-a662-41da-8f03-820b496503bf",
        name:"",
        description:""
      }
    default:
  }
}
