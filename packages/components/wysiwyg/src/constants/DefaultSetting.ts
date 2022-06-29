import { AlignTypes } from './../WysiwygTextAlignEditor'
import { ResizeType } from '../WysiwygResizeButton'

export interface DefaultSetting {
  RESIZE_TYPE: ResizeType
  FONT_SIZE: number
  FONT_COLOR: string
  LETTER_SPACE: number
  LINE_HEIGHT: number
  TEXT_ALIGN: AlignTypes
}

export const DEFAULT_SETTING: DefaultSetting = {
  RESIZE_TYPE: 'none',
  FONT_SIZE: 10,
  FONT_COLOR: '#000',
  LETTER_SPACE: 0,
  LINE_HEIGHT: 18,
  TEXT_ALIGN: AlignTypes.Left,
}
