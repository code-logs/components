import { EditorProperty } from './EditorProperties'

export interface KeyBinding {
  key: string
  property: EditorProperty
  value?: string
}
