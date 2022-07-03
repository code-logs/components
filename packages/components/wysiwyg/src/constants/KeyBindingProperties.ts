import { EditorProperty } from '../types'

type KeyBindingProperties = {
  [property in EditorProperty]: string
}

export const KEY_BINDING_PROPERTIES: KeyBindingProperties = {
  [EditorProperty.Color]: 'Color',
  [EditorProperty.FontSize]: 'Font size',
  [EditorProperty.FontWeight]: 'Font weight',
  [EditorProperty.LetterSpacing]: 'Letter spacing',
  [EditorProperty.LineHeight]: 'Line height',
  [EditorProperty.TextAlign]: 'Text align',
}
