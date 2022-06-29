import React, { ChangeEvent } from 'react'

export interface WysiwygFontColorEditorProps {
  defaultFontColor: string
  onColorChangeHandler: (color: string) => void
}

const WysiwygFontColorEditor = ({
  defaultFontColor,
  onColorChangeHandler,
}: WysiwygFontColorEditorProps) => {
  return (
    <input
      type="color"
      defaultValue={defaultFontColor}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        onColorChangeHandler(event.currentTarget.value)
      }}
    />
  )
}

export default WysiwygFontColorEditor
