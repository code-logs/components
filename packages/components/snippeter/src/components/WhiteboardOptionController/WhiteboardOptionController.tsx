import React, { ChangeEvent } from 'react'
import '../../styles/whiteboard-option-controller.scss'

export interface WhiteboardOptionControllerProps {
  onFontSizeChangeHandler: (fontSize: number) => void
  onLineHeightChangeHandler: (lineHeight: number) => void
}

const WhiteboardOptionController = ({
  onFontSizeChangeHandler,
  onLineHeightChangeHandler,
}: WhiteboardOptionControllerProps) => {
  return (
    <section id="snippeter-whiteboard-option-controller">
      <label>
        <span>Font Size</span>
        <input
          type="number"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onFontSizeChangeHandler(Number(event.currentTarget.value))
          }}
        />
      </label>

      <label>
        <span>Line Height</span>
        <input
          type="number"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onLineHeightChangeHandler(Number(event.currentTarget.value))
          }}
        />
      </label>
    </section>
  )
}

export default WhiteboardOptionController
