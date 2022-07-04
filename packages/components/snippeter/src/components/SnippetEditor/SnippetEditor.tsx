import React, { FormEvent, useRef } from 'react'
import { Snippet } from '../../types'
import '../../styles/snippet-editor.scss'

export interface SnippetEditorProps {
  editorTitle?: string
  actionTitle?: string
  snippet?: Snippet
  onActionClickHandler?: (snippet: Snippet) => void
}

const SnippetEditor = ({
  editorTitle,
  actionTitle,
  snippet,
  onActionClickHandler,
}: SnippetEditorProps) => {
  const { key, tag, fontSize, color, fontWeight, useItalic } = snippet || {}
  const snippetEditorRef = useRef<HTMLFormElement>(null)

  const clearForm = () => {
    if (snippetEditorRef.current) snippetEditorRef.current.reset()
  }

  return (
    <form
      id="snippet-editor"
      ref={snippetEditorRef}
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!onActionClickHandler) return

        const snippetEditor = snippetEditorRef.current
        if (!snippetEditor) return

        const snippet = Object.fromEntries(new FormData(snippetEditor))
        onActionClickHandler(snippet as unknown as Snippet)
        clearForm()
      }}
    >
      <fieldset>
        {editorTitle && <legend>{editorTitle}</legend>}

        <label className="v-label">
          <span>Key</span>
          <input
            name="key"
            type="text"
            required
            defaultValue={key}
            disabled={!actionTitle}
          />
        </label>

        <label className="v-label">
          <span>Tag</span>
          <input
            name="tag"
            type="text"
            required
            defaultValue={tag}
            disabled={!actionTitle}
          />
        </label>

        <label className="v-label">
          <span>Font size</span>
          <input
            name="font-size"
            type="number"
            min={1}
            defaultValue={fontSize}
            disabled={!actionTitle}
          />
        </label>

        <label className="v-label">
          <span>Font color</span>
          <input
            name="font-color"
            type="color"
            defaultValue={color || '#000000'}
            disabled={!actionTitle}
          />
        </label>

        <label className="v-label">
          <span>Font weight</span>
          <select
            name="font-weight"
            defaultValue={fontWeight}
            disabled={!actionTitle}
          >
            <option></option>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={300}>300</option>
            <option value={400}>400 (normal)</option>
            <option value={500}>500 (bold)</option>
            <option value={600}>600</option>
            <option value={700}>700</option>
            <option value={800}>800</option>
            <option value={900}>900</option>
          </select>
        </label>

        <label className="v-label">
          <span>Italic</span>
          <input
            name="italic"
            type="checkbox"
            defaultChecked={useItalic}
            disabled={!actionTitle}
          />
        </label>

        {actionTitle && onActionClickHandler && (
          <input type="submit" value={actionTitle} />
        )}
      </fieldset>
    </form>
  )
}

export default SnippetEditor
