import React, { FocusEvent } from 'react'

export interface WysiwygFontWeightEditorProps {
  defaultFontWeight?: number
  onFontWeightChangeHandler: (fontWeight: number) => void
}

const WysiwygFontWeightEditor = ({
  defaultFontWeight = 400,
  onFontWeightChangeHandler,
}: WysiwygFontWeightEditorProps) => {
  return (
    <input
      type="number"
      defaultValue={defaultFontWeight}
      onBlur={(event: FocusEvent<HTMLInputElement>) => {
        if (!event.currentTarget.value) {
          event.currentTarget.value = String(defaultFontWeight)
          onFontWeightChangeHandler(defaultFontWeight)
        } else {
          onFontWeightChangeHandler(Number(event.currentTarget.value))
        }
      }}
    />
  )
}

export default WysiwygFontWeightEditor
