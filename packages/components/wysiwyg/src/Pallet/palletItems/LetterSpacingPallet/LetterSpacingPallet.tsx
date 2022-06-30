import React, { FocusEvent } from 'react'

export interface LetterSpacingPalletProps {
  defaultLetterSpacing?: number
  onLetterSpacingChangeHandler: (letterSpacing: number) => void
}

const LetterSpacingPallet = ({
  defaultLetterSpacing = 0,
  onLetterSpacingChangeHandler,
}: LetterSpacingPalletProps) => {
  return (
    <input
      type="number"
      defaultValue={defaultLetterSpacing}
      onBlur={(event: FocusEvent<HTMLInputElement>) => {
        if (!event.currentTarget.value) {
          event.currentTarget.value = String(defaultLetterSpacing)
          onLetterSpacingChangeHandler(defaultLetterSpacing)
        } else {
          onLetterSpacingChangeHandler(Number(event.currentTarget.value))
        }
      }}
    />
  )
}

export default LetterSpacingPallet
