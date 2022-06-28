import React, { useEffect, useState } from 'react'

export type ResizeType = 'horizontal' | 'vertical' | 'both' | 'none'

export interface WysiwygResizeButtonProps {
  defaultResizeType?: ResizeType
  onResizeTypeChangeHandler: (resizeType: ResizeType) => void
}

const stateOrders: ResizeType[] = ['none', 'horizontal', 'vertical', 'both']

const WysiwygResizeButton = ({
  defaultResizeType = 'none',
  onResizeTypeChangeHandler,
}: WysiwygResizeButtonProps) => {
  const [resizeState, setResizeState] = useState<ResizeType>(defaultResizeType)

  const rollResizeState = () => {
    const currentStateIndex = stateOrders.findIndex(
      (state) => state === resizeState
    )

    const nextState = stateOrders[currentStateIndex + 1] || stateOrders[0]
    setResizeState(nextState)
  }

  useEffect(() => {
    onResizeTypeChangeHandler(resizeState)
  }, [onResizeTypeChangeHandler, resizeState])

  return <button onClick={rollResizeState}>{resizeState}</button>
}

export default WysiwygResizeButton
