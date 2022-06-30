import React, { FocusEvent } from 'react'

export interface LineHeightPalletProps {
  defaultLineHeight?: number
  onLineHeightChangeHandler: (lineHeight: number) => void
}

const LineHeightPallet = ({
  defaultLineHeight = 18,
  onLineHeightChangeHandler,
}: LineHeightPalletProps) => {
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

export default LineHeightPallet
