import { SupportingPalletItems } from './constants/SupportingPalletItems'
import React, { useEffect, useMemo, useState } from 'react'
import { PalletItemType } from 'types/PalletItem'
import './styles/styles.scss'
import WysiwygResizeEditor, { ResizeType } from './WysiwygResizeEditor'
import { DEFAULT_SETTING } from './constants/DefaultSetting'
import WysiwygFontSizeEditor from './WysiwygFontSizeEditor'
import WysiwygFontColorEditor from './WysiwygFontColorEditor'
import WysiwygLetterSpaceEditor from './WysiwygLetterSpaceEditor'
import WysiwygLineHeightEditor from './WysiwygLineHeightEditor'
import WysiwygTextAlignEditor from './WysiwygTextAlignEditor'

export interface WysiwygProps {
  palletItemTypes?: PalletItemType[]
}

const Wysiwyg = ({ palletItemTypes }: WysiwygProps) => {
  const [activeItem, setActiveItem] = useState<PalletItemType | null>(null)
  const [resizeType, setResizeType] = useState<ResizeType>(
    DEFAULT_SETTING.RESIZE_TYPE
  )
  const [fontSize, setFontSize] = useState(DEFAULT_SETTING.FONT_SIZE)
  const [fontColor, setFontColor] = useState(DEFAULT_SETTING.FONT_COLOR)
  const [letterSpace, setLetterSpace] = useState(DEFAULT_SETTING.LETTER_SPACE)
  const [lineHeight, setLineHeight] = useState(DEFAULT_SETTING.LINE_HEIGHT)
  const [textAlign, setTextAlign] = useState(DEFAULT_SETTING.TEXT_ALIGN)

  const activePalletItems = useMemo(() => {
    if (!palletItemTypes?.length) return SupportingPalletItems
    return SupportingPalletItems.filter(({ type }) =>
      palletItemTypes.includes(type)
    )
  }, [palletItemTypes])

  useEffect(() => {
    if (activeItem || !palletItemTypes?.length) return
    setActiveItem(palletItemTypes[0])
  }, [activeItem, palletItemTypes])

  return (
    <>
      <div id="pallets">
        {activePalletItems.map((item) => (
          <button key={item.type}>
            <i>{item.icon}</i>
          </button>
        ))}
      </div>
      <div id="settings">
        <WysiwygResizeEditor onResizeTypeChangeHandler={setResizeType} />
        <WysiwygFontSizeEditor
          defaultFontSize={DEFAULT_SETTING.FONT_SIZE}
          onFontSizeChangeHandler={setFontSize}
        />
        <WysiwygFontColorEditor
          defaultFontColor={DEFAULT_SETTING.FONT_COLOR}
          onColorChangeHandler={setFontColor}
        />
        <WysiwygLetterSpaceEditor
          defaultLetterSpace={DEFAULT_SETTING.LETTER_SPACE}
          onLetterSpaceChangeHandler={setLetterSpace}
        />
        <WysiwygLineHeightEditor
          defaultLineHeight={DEFAULT_SETTING.LINE_HEIGHT}
          onLineHeightChangeHandler={setLineHeight}
        />
        <WysiwygTextAlignEditor
          defaultAlignType={DEFAULT_SETTING.TEXT_ALIGN}
          onTextAlignChangeHandler={setTextAlign}
        />
      </div>

      <div
        id="white-board"
        style={{
          resize: resizeType,
        }}
        contentEditable
      ></div>
    </>
  )
}

export default Wysiwyg
