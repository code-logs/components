import { AlignTypes, KeyBinding, EditorProperty } from '../types'
import { Resize } from '../types/Resize'

export interface DefaultSetting {
  RESIZE_TYPE: Resize
  FONT_SIZE: number
  FONT_COLOR: string
  FONT_WEIGHT: number
  LETTER_SPACING: number
  LINE_HEIGHT: number
  TEXT_ALIGN: AlignTypes
  KEY_BINDINGS: KeyBinding[]
}

export const DEFAULT_SETTING: DefaultSetting = {
  RESIZE_TYPE: 'none',
  FONT_SIZE: 16,
  FONT_COLOR: '#000',
  FONT_WEIGHT: 400,
  LETTER_SPACING: 0,
  LINE_HEIGHT: 18,
  TEXT_ALIGN: AlignTypes.Left,
  KEY_BINDINGS: [
    { key: 'c', property: EditorProperty.Color },
    { key: 's', property: EditorProperty.FontSize },
    { key: 'w', property: EditorProperty.FontWeight },
  ],
}
