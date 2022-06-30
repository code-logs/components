import React, { FocusEvent } from 'react'

export interface FontWeightPalletProps {
  defaultFontWeight?: number
  onFontWeightChangeHandler: (fontWeight: number) => void
}

const FontWeightPallet = ({
  defaultFontWeight = 400,
  onFontWeightChangeHandler,
}: FontWeightPalletProps) => {
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

export default FontWeightPallet
