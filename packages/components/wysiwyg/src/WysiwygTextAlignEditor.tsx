import React, { ChangeEvent } from 'react'

export enum AlignTypes {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

const alignTypes = [
  AlignTypes.Left,
  AlignTypes.Center,
  AlignTypes.Right,
] as const

export interface WysiwygTextAlignEditorProps {
  defaultAlignType?: AlignTypes
  onTextAlignChangeHandler: (alignType: AlignTypes) => void
}

const WysiwygTextAlignEditor = ({
  defaultAlignType = AlignTypes.Left,
  onTextAlignChangeHandler,
}: WysiwygTextAlignEditorProps) => {
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

export default WysiwygTextAlignEditor
