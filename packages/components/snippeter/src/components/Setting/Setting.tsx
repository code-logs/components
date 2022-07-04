import React, {
  CSSProperties,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Snippet } from '../../types'
import '../../styles/setting.scss'
import { DEFAULT_SETTINGS } from '../../constants'
import SnippetEditor from '../SnippetEditor/SnippetEditor'
import withPixel from '../../utils/with-pixel'

export interface SettingProps {
  snippets?: Snippet[]
  onSnippetsChangeHandler: (snippets: Snippet[]) => void
  onCloseHandler: () => void
}

const Setting = ({
  snippets = DEFAULT_SETTINGS.SNIPPETS,
  onSnippetsChangeHandler,
  onCloseHandler,
}: SettingProps) => {
  const [visibility, setVisibility] = useState(false)

  useEffect(() => {
    if (!visibility) setVisibility(true)
  }, [])

  const closeModal = useCallback(() => {
    setVisibility(false)
  }, [])

  const [toggledSnippetKey, setToggledSnippetKey] = useState<string | null>(
    null
  )

  const checkSnippetDuplication = (snippet: Snippet) => {
    if (snippets.some(({ key }) => key === snippet.key)) {
      throw new Error(
        `Snippet which has ${snippet.key} as its key already exists`
      )
    }
  }

  const addSnippet = (snippet: Snippet) => {
    onSnippetsChangeHandler([...snippets, snippet])
  }

  const deleteSnippet = (targetSnippetKey: Snippet['key']) => {
    onSnippetsChangeHandler(
      snippets.filter(({ key }) => key !== targetSnippetKey)
    )
  }

  const generateSnippetSample = useCallback(
    ({ key, tag, fontSize, color, fontWeight, useItalic }: Snippet) => {
      const style: CSSProperties = {}
      if (fontSize) style.fontSize = withPixel(fontSize)
      if (color) style.color = color
      if (fontWeight) style.fontWeight = fontWeight
      if (useItalic) style.fontStyle = 'italic'

      return React.createElement(tag, { style }, `${key} - ${tag}`)
    },
    []
  )

  return (
    <section
      id="snippeter-setting"
      className={visibility ? 'visible' : ''}
      onKeyUp={(event: KeyboardEvent<HTMLElement>) => {
        if (event.code === 'Escape') {
          setVisibility(false)
        }
      }}
      onTransitionEnd={() => {
        if (!visibility) onCloseHandler()
      }}
    >
      <div id="modal" onClick={closeModal}></div>

      <div id="setting">
        <header className="main-header">
          <h1 className="title">Setting</h1>
          <button id="close-button" type="button" onClick={closeModal}>
            X
          </button>
        </header>

        <section id="snippets">
          <header>
            <h2 className="subtitle">My Snippets</h2>
          </header>

          {snippets.length ? (
            <ul id="my-snippet-list">
              {snippets.map((snippet) => {
                const { key } = snippet

                return (
                  <li className="my-snippet-list-item" key={key}>
                    {generateSnippetSample(snippet)}
                    {key === toggledSnippetKey ? (
                      <button
                        className="button"
                        type="button"
                        onClick={() => {
                          setToggledSnippetKey(null)
                        }}
                      >
                        Close
                      </button>
                    ) : (
                      <button
                        className="button"
                        type="button"
                        onClick={() => {
                          setToggledSnippetKey(key)
                        }}
                      >
                        Detail
                      </button>
                    )}
                    <button
                      className="button"
                      type="button"
                      onClick={() => {
                        if (confirm(`Are you sure to delete ${key} snippet?`)) {
                          deleteSnippet(key)
                          setToggledSnippetKey(null)
                        }
                      }}
                    >
                      Delete
                    </button>

                    {key === toggledSnippetKey && (
                      <SnippetEditor
                        snippet={snippets.find(
                          ({ key }) => key === toggledSnippetKey
                        )}
                      />
                    )}
                  </li>
                )
              })}
            </ul>
          ) : (
            <div id="no-snippet-message">
              <strong>
                <em>No Snippet Found!</em>
              </strong>
              <span>You can register your own snippet.</span>
            </div>
          )}
        </section>

        <section id="add-snippet">
          <header>
            <h2 className="subtitle">Add Snippets</h2>
          </header>
          <SnippetEditor
            actionTitle="Save"
            onActionClickHandler={(snippet) => {
              try {
                checkSnippetDuplication(snippet)
                addSnippet(snippet)
              } catch (e) {
                if (e instanceof Error) {
                  alert(e.message)
                } else {
                  alert('Unexpected error is occurred')
                }
              }
            }}
          />
        </section>
      </div>
    </section>
  )
}

export default Setting
