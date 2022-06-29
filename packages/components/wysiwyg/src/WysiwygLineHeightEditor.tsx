import React, { FocusEvent } from 'react'

export interface WysiwygLineHeightEditorProps {
  defaultLineHeight?: number
  onLineHeightChangeHandler: (lineHeight: number) => void
}

const WysiwygLineHeightEditor = ({
  defaultLineHeight = 18,
  onLineHeightChangeHandler,
}: WysiwygLineHeightEditorProps) => {
  return (
    <input
      type="number"
      defaultValue={defaultLineHeight}
      onBlur={(event: FocusEvent<HTMLInputElement>) => {
        if (!event.currentTarget.value) {
          event.currentTarget.value = String(defaultLineHeight)
          onLineHeightChangeHandler(defaultLineHeight)
        } else {
          onLineHeightChangeHandler(Number(event.currentTarget.value))
        }
      }}
    />
  )
}

export default WysiwygLineHeightEditor
