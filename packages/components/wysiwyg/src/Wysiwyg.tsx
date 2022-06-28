import { SupportingPalletItems } from './constants/SupportingPalletItems'
import React, { useEffect, useMemo, useState } from 'react'
import { PalletItemType } from 'types/PalletItem'
import './styles/styles.scss'

export interface WysiwygProps {
  palletItemTypes?: PalletItemType[]
}

const Wysiwyg = ({ palletItemTypes }: WysiwygProps) => {
  const [activeItem, setActiveItem] = useState<PalletItemType | null>(null)

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
    <section>
      <div id="icon-container">
        {activePalletItems.map((item) => (
          <button key={item.type}>
            <i>{item.icon}</i>
          </button>
        ))}
      </div>

      <div id="white-board" contentEditable></div>
    </section>
  )
}

export default Wysiwyg
