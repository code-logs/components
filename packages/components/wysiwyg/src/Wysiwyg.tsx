import React from 'react'
import { ResizeType } from './constants'
import WysiwygWhiteBoard from './WysiwygWhiteBoard'

export interface WysiwygProps {
  resizeType?: ResizeType
}

const Wysiwyg = ({ resizeType = 'none' }: WysiwygProps) => {
  return <WysiwygWhiteBoard resizeType={resizeType} />
}

export default Wysiwyg
