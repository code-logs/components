import React, { FocusEvent } from 'react'

export interface WysiwygLetterSpaceEditorProps {
  defaultLetterSpace?: number
  onLetterSpaceChangeHandler: (letterSpace: number) => void
}

const WysiwygLetterSpaceEditor = ({
  defaultLetterSpace = 0,
  onLetterSpaceChangeHandler,
}: WysiwygLetterSpaceEditorProps) => {
  return (
    <input
      type="number"
      defaultValue={defaultLetterSpace}
      onBlur={(event: FocusEvent<HTMLInputElement>) => {
        if (!event.currentTarget.value) {
          event.currentTarget.value = String(defaultLetterSpace)
          onLetterSpaceChangeHandler(defaultLetterSpace)
        } else {
          onLetterSpaceChangeHandler(Number(event.currentTarget.value))
        }
      }}
    />
  )
}

export default WysiwygLetterSpaceEditor
