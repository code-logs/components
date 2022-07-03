import React, { useState } from 'react'
import { DEFAULT_SETTING } from '../constants'
import FontColorPallet from './palletItems/FontColorPallet/FontColorPallet'
import FontSizePallet from './palletItems/FontSizePallet/FontSizePallet'
import FontWeightPallet from './palletItems/FontWeightPallet/FontWeightPallet'
import LetterSpacingPallet from './palletItems/LetterSpacingPallet/LetterSpacingPallet'
import LineHeightPallet from './palletItems/LineHeightPallet/LineHeightPallet'
import TextAlignPallet from './palletItems/TextAlignPallet/TextAlignPallet'

const Pallet = () => {
  const [fontSize, setFontSize] = useState(DEFAULT_SETTING.FONT_SIZE)
  const [fontColor, setFontColor] = useState(DEFAULT_SETTING.FONT_COLOR)
  const [fontWeight, setFontWeight] = useState(DEFAULT_SETTING.FONT_WEIGHT)
  const [letterSpacing, setLetterSpacing] = useState(
    DEFAULT_SETTING.LETTER_SPACING
  )
  const [lineHeight, setLineHeight] = useState(DEFAULT_SETTING.LINE_HEIGHT)
  const [textAlign, setTextAlign] = useState(DEFAULT_SETTING.TEXT_ALIGN)

  return (
    <>
      <div id="settings">
        <FontSizePallet
          defaultFontSize={DEFAULT_SETTING.FONT_SIZE}
          onFontSizeChangeHandler={setFontSize}
        />
        <FontColorPallet
          defaultFontColor={DEFAULT_SETTING.FONT_COLOR}
          onColorChangeHandler={setFontColor}
        />
        <FontWeightPallet
          defaultFontWeight={DEFAULT_SETTING.FONT_WEIGHT}
          onFontWeightChangeHandler={setFontWeight}
        />
        <LetterSpacingPallet
          defaultLetterSpacing={DEFAULT_SETTING.LETTER_SPACING}
          onLetterSpacingChangeHandler={setLetterSpacing}
        />
        <LineHeightPallet
          defaultLineHeight={DEFAULT_SETTING.LINE_HEIGHT}
          onLineHeightChangeHandler={setLineHeight}
        />
        <TextAlignPallet
          defaultAlignType={DEFAULT_SETTING.TEXT_ALIGN}
          onTextAlignChangeHandler={setTextAlign}
        />
      </div>
    </>
  )
}

export default Pallet
