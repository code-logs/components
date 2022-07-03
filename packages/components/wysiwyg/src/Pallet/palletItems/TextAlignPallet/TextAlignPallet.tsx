import React, { ChangeEvent } from 'react'
import { AlignTypes } from '../../../types'

const alignTypes = [
  AlignTypes.Left,
  AlignTypes.Center,
  AlignTypes.Right,
] as const

export interface TextAlignPalletProps {
  defaultAlignType?: AlignTypes
  onTextAlignChangeHandler: (alignType: AlignTypes) => void
}

const TextAlignPallet = ({
  defaultAlignType = AlignTypes.Left,
  onTextAlignChangeHandler,
}: TextAlignPalletProps) => {
  return (
    <select
      defaultValue={defaultAlignType}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
        onTextAlignChangeHandler(event.currentTarget.value as AlignTypes)
      }}
    >
      {alignTypes.map((alignType) => (
        <option key={alignType}>{alignType}</option>
      ))}
    </select>
  )
}

export default TextAlignPallet
