import { EditorTypes } from './../types/EditorType'
import { AlignTypes } from '../Pallet/palletItems/TextAlignPallet/TextAlignPallet'
import { ResizeType } from './ResizeType'

export interface DefaultSetting {
  EDITOR_TYPE: EditorTypes
  RESIZE_TYPE: ResizeType
  FONT_SIZE: number
  FONT_COLOR: string
  FONT_WEIGHT: number
  LETTER_SPACING: number
  LINE_HEIGHT: number
  TEXT_ALIGN: AlignTypes
}

export const DEFAULT_SETTING: DefaultSetting = {
  EDITOR_TYPE: 'text',
  RESIZE_TYPE: 'none',
  FONT_SIZE: 16,
  FONT_COLOR: '#000',
  FONT_WEIGHT: 400,
  LETTER_SPACING: 0,
  LINE_HEIGHT: 18,
  TEXT_ALIGN: AlignTypes.Left,
}
