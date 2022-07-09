import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import '../../styles/snippet-context.scss'
import { Snippet } from '../../types'
import { generateSampleSnippet } from '../../utils/generate-snippet'
import withPixel from '../../utils/with-pixel'

export interface SnippetContextProps {
  positionX: number
  positionY: number
  snippets: Snippet[]
  onContextCloseHandler: (snippet: Snippet | null) => void
}

const SnippetContext = ({
  positionX,
  positionY,
  snippets,
  onContextCloseHandler,
}: SnippetContextProps) => {
  const [foundSnippets, setFoundSnippets] = useState<Snippet[]>(snippets)
  const [focusedSnippetIndex, setFocusedSnippetIndex] = useState(-1)
  const [visibility, setVisibility] = useState<boolean | null>(null)
  const [chosenSnippet, setChosenSnippet] = useState<Snippet | null>(null)

  useEffect(() => {
    setVisibility(true)
  }, [])

  const onContextKeyDownHandler = ({ key }: KeyboardEvent<HTMLElement>) => {
    if (key === 'ArrowDown' && focusedSnippetIndex + 1 < foundSnippets.length) {
      setFocusedSnippetIndex((v) => v + 1)
    } else if (key === 'ArrowUp' && focusedSnippetIndex > 0) {
      setFocusedSnippetIndex((v) => v - 1)
    }
  }

  useEffect(() => {
    if (!chosenSnippet) return
    setVisibility(false)
  }, [chosenSnippet])

  const onKeyChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const condition = event.currentTarget.value
    if (condition) {
      const exactSnippetIndex = snippets.findIndex(
        ({ key }) => key === condition
      )
      if (exactSnippetIndex >= 0) setFocusedSnippetIndex(exactSnippetIndex)

      const tempSnippets = snippets.filter(
        ({ key }) => key.indexOf(condition) >= 0
      )

      if (tempSnippets.length === 1) {
        setChosenSnippet(tempSnippets[0])
      } else {
        setFoundSnippets(tempSnippets)
      }
    } else {
      setFoundSnippets(snippets)
    }
  }

  const onInputKeyDownHandler = ({ code }: KeyboardEvent<HTMLInputElement>) => {
    if (code !== 'Enter' || focusedSnippetIndex < 0) return

    setChosenSnippet(foundSnippets[focusedSnippetIndex])
  }

  return (
    <section
      id="snippeter-snippet-context"
      style={{
        position: 'absolute',
        left: withPixel(positionX),
        top: withPixel(positionY),
      }}
      className={visibility ? 'visible' : undefined}
      onKeyDown={onContextKeyDownHandler}
      onTransitionEnd={() => {
        if (!visibility) onContextCloseHandler(chosenSnippet)
      }}
    >
      <input
        autoFocus
        onChange={onKeyChangeHandler}
        onKeyDown={onInputKeyDownHandler}
      />

      <ul>
        {foundSnippets.map((snippet, index) => (
          <li
            tabIndex={-1}
            key={snippet.key}
            className={focusedSnippetIndex === index ? 'focus' : ''}
            onClick={() => {
              setChosenSnippet(snippet)
            }}
          >
            {generateSampleSnippet(snippet)}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SnippetContext
