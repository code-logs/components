import React, { ChangeEvent } from 'react'

interface FontSizeOption {
  name: string
  value: number
}

interface FontSizePalletProps {
  fontSizeOptions?: FontSizeOption[]
  defaultFontSize: number
  onFontSizeChangeHandler: (fontSize: number) => void
}

const defaultFontSizeOptions: FontSizeOption[] = [
  { name: '아주 작게 (8px)', value: 8 },
  { name: '작게 (12px)', value: 12 },
  { name: '보통 (16px)', value: 16 },
  { name: '크게 (20px)', value: 20 },
  { name: '아주 크게 (24px)', value: 24 },
]

const FontSizePallet = ({
  fontSizeOptions = defaultFontSizeOptions,
  defaultFontSize,
  onFontSizeChangeHandler,
}: FontSizePalletProps) => {
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

export default FontSizePallet
