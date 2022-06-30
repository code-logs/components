import React, { ChangeEvent } from 'react'

export interface FontColorPalletProps {
  defaultFontColor: string
  onColorChangeHandler: (color: string) => void
}

const FontColorPallet = ({
  defaultFontColor,
  onColorChangeHandler,
}: FontColorPalletProps) => {
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

export default FontColorPallet
