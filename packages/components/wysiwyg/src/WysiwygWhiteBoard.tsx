import TextEditor from './editors/TextEditor/TextEditor'
import React, { useState } from 'react'
import { ResizeType } from './constants'
import './styles/white-board-style.scss'

interface WysiwygWhiteBoardProps {
  resizeType: ResizeType
}

const WysiwygWhiteBoard = ({ resizeType }: WysiwygWhiteBoardProps) => {
  const [rowEditors, setRowEditors] = useState<React.ReactElement[]>([])

  const appendNewLine = () => {
    setRowEditors([
      ...rowEditors,
      <TextEditor key={`row-index-${rowEditors.length}`} />,
    ])
  }

  return (
    <div
      id="white-board"
      style={{
        resize: resizeType,
      }}
    >
      {rowEditors.map((rowEditor, index) => (
        <div className="edit-row" key={`row-${index}`}>
          {rowEditor}
        </div>
      ))}
      <div id="new-line-silhouette" onClick={appendNewLine}>
        +
      </div>
    </div>
  )
}

export default WysiwygWhiteBoard
