import { SupportingPalletItems } from './constants/SupportingPalletItems'
import React, { useEffect, useMemo, useState } from 'react'
import { PalletItemType } from 'types/PalletItem'
import './styles/styles.scss'
import WysiwygResizeButton, { ResizeType } from './WysiwygResizeButton'
import { DEFAULT_SETTING } from './constants/DefaultSetting'

export interface WysiwygProps {
  palletItemTypes?: PalletItemType[]
}

const Wysiwyg = ({ palletItemTypes }: WysiwygProps) => {
  const [activeItem, setActiveItem] = useState<PalletItemType | null>(null)
  const [resizeType, setResizeType] = useState<ResizeType>(
    DEFAULT_SETTING.RESIZE_TYPE
  )

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
        <WysiwygResizeButton onResizeTypeChangeHandler={setResizeType} />
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
