import {
  FormatSize as FontSizeIcon,
  LineWeight as LineHeightIcon,
} from '@mui/icons-material'
import React, { ChangeEvent } from 'react'
import '../../styles/whiteboard-option-controller.scss'

export interface WhiteboardOptionControllerProps {
  fontSize: number
  lineHeight: number
  onFontSizeChangeHandler: (fontSize: number) => void
  onLineHeightChangeHandler: (lineHeight: number) => void
}

const WhiteboardOptionController = ({
  fontSize,
  lineHeight,
  onFontSizeChangeHandler,
  onLineHeightChangeHandler,
}: WhiteboardOptionControllerProps) => {
  return (
    <section className="snippeter-whiteboard-option-controller">
      <div className="option">
        <FontSizeIcon />
        <input
          type="number"
          autoFocus
          defaultValue={fontSize}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onFontSizeChangeHandler(Number(event.currentTarget.value))
          }}
        />
      </div>

      <div className="option">
        <LineHeightIcon />
        <input
          type="number"
          autoFocus
          defaultValue={lineHeight}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onLineHeightChangeHandler(Number(event.currentTarget.value))
          }}
        />
      </div>
    </section>
  )
}

export default WhiteboardOptionController
