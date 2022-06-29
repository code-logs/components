import React, { ChangeEvent } from 'react'

interface FontSizeOption {
  name: string
  value: number
}

interface WysiwygFontSizeEditorProps {
  fontSizeOptions?: FontSizeOption[]
  defaultFontSize: number
  onFontSizeChangeHandler: (fontSize: number) => void
}

const defaultFontSizeOptions: FontSizeOption[] = [
  { name: '아주 작게 (6pt)', value: 6 },
  { name: '작게 (8pt)', value: 8 },
  { name: '보통 (10pt)', value: 10 },
  { name: '크게 (12pt)', value: 12 },
  { name: '아주 크게 (14pt)', value: 14 },
]

const WysiwygFontSizeEditor = ({
  fontSizeOptions = defaultFontSizeOptions,
  defaultFontSize,
  onFontSizeChangeHandler,
}: WysiwygFontSizeEditorProps) => {
  return (
    <select
      defaultValue={defaultFontSize}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
        onFontSizeChangeHandler(Number(event.currentTarget.value))
      }}
    >
      {fontSizeOptions.map(({ name, value }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  )
}

export default WysiwygFontSizeEditor
