import React, { ChangeEvent } from 'react'
import { EditorTypes } from '../../../types/EditorType'

export interface EditorTypePalletProps {
  defaultEditorType: EditorTypes
  onEditorTypeChangeHandler: (editorType: EditorTypes) => void
}

const EditorTypePallet = ({
  defaultEditorType,
  onEditorTypeChangeHandler,
}: EditorTypePalletProps) => {
  const editorTypes: EditorTypes[] = ['text', 'code-block']

  return (
    <select
      defaultValue={defaultEditorType}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
        onEditorTypeChangeHandler(event.currentTarget.value as EditorTypes)
      }}
    >
      {editorTypes.map((editorType) => (
        <option key={editorType}>{editorType}</option>
      ))}
    </select>
  )
}

export default EditorTypePallet
