import React from 'react'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { KEY_BINDING_PROPERTIES } from './constants'
import './styles/setting-view-style.scss'
import { KeyBinding } from './types'

export interface WysiwygSettingProps {
  keyBindings: KeyBinding[]
  onCloseHandler: () => void
  onKeyBindingChangeHandler: (keyBindings: KeyBinding[]) => void
}

const WysiwygSetting = ({
  keyBindings,
  onCloseHandler,
  onKeyBindingChangeHandler,
}: WysiwygSettingProps) => {
  const [visible, setVisible] = useState(false)
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null)

  const editingKeyInput = useRef<HTMLInputElement>(null)
  const editingPropsSelector = useRef<HTMLSelectElement>(null)
  const editingValueInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setVisible(true)
  }, [])

  const updateKeyBindings = (newKeyBindings: KeyBinding[]) => {
    onKeyBindingChangeHandler(newKeyBindings)
    if (editingRowIndex !== null) setEditingRowIndex(null)
  }

  const saveKeyBinding = () => {
    const key = editingKeyInput?.current?.value
    const property = editingPropsSelector?.current?.value
    const value = editingValueInput?.current?.value

    if (key && property) {
      updateKeyBindings(
        keyBindings.map((keyBinding, itemIndex) => {
          if (itemIndex === editingRowIndex) {
            return {
              key,
              property,
              value,
            } as KeyBinding
          } else {
            return keyBinding
          }
        })
      )
    }
  }

  const deleteKeyBinding = () => {
    const answer = confirm('Are you sure to remove this key binding?')

    if (answer) {
      updateKeyBindings(
        keyBindings.filter((_, itemIndex) => itemIndex !== editingRowIndex)
      )
    }
  }

  return (
    <section
      id="setting-view-modal"
      className={visible ? 'visible' : undefined}
      onTransitionEnd={() => {
        if (!visible) onCloseHandler()
      }}
    >
      <section id="setting-view-content">
        <header id="setting-view-header">
          <h1 id="title">Setting</h1>
          <button
            id="close-button"
            type="button"
            onClick={() => {
              setVisible(false)
            }}
          >
            X
          </button>
        </header>

        <section id="key-binding">
          <h2 id="sub-title">Key bindings</h2>
          <ul id="key-binding-list">
            <li id="list-header">
              <span>Key</span>
              <span>Property</span>
              <span>Value</span>
            </li>
            {keyBindings.map(({ key, property, value }, index) => {
              return (
                <li key={key}>
                  <input
                    defaultValue={key}
                    disabled={editingRowIndex !== index}
                    ref={
                      editingRowIndex === index ? editingKeyInput : undefined
                    }
                  />
                  <select
                    defaultValue={property}
                    disabled={editingRowIndex !== index}
                    ref={
                      editingRowIndex === index
                        ? editingPropsSelector
                        : undefined
                    }
                  >
                    {Object.keys(KEY_BINDING_PROPERTIES).map((prop, idx) => (
                      <option key={`prop-${idx}`} value={prop}>
                        {KEY_BINDING_PROPERTIES[prop]}
                      </option>
                    ))}
                  </select>
                  <input
                    defaultValue={value}
                    disabled={editingRowIndex !== index}
                    ref={
                      editingRowIndex === index ? editingValueInput : undefined
                    }
                  />

                  {editingRowIndex === index ? (
                    <div className="edit-button-group">
                      <button type="button" onClick={saveKeyBinding}>
                        Save
                      </button>
                      <button type="button" onClick={deleteKeyBinding}>
                        Delete
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingRowIndex(index)
                      }}
                    >
                      Edit
                    </button>
                  )}
                </li>
              )
            })}
          </ul>

          <form
            id="new-key-binding-form"
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              event.preventDefault()

              const form = event.currentTarget
              if (form.checkValidity()) {
                const newKeyBinding = Object.fromEntries(
                  new FormData(form)
                ) as unknown as KeyBinding

                if (keyBindings.some(({ key }) => key === newKeyBinding.key)) {
                  return alert(
                    "You can't create property which has same key value."
                  )
                }

                updateKeyBindings([
                  ...keyBindings,
                  newKeyBinding as unknown as KeyBinding,
                ])

                form.reset()
              }
            }}
          >
            <fieldset>
              <legend>New key binding</legend>

              <input name="key" placeholder="Key" required />
              <select name="property" required>
                {Object.keys(KEY_BINDING_PROPERTIES).map((property) => {
                  return (
                    <option key={property} value={property}>
                      {KEY_BINDING_PROPERTIES[property]}
                    </option>
                  )
                })}
              </select>
              <input name="value" placeholder="Value" />

              <input type="submit" value="Save" />
            </fieldset>
          </form>
        </section>

        <footer></footer>
      </section>
    </section>
  )
}

export default WysiwygSetting
