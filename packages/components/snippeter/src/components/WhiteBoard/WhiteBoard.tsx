import React, {
  CSSProperties,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from 'react'
import {
  DEFAULT_SETTINGS,
  PHRASE_ATTRIBUTE,
  SNIPPET_ATTRIBUTE,
} from '../../constants'
import '../../styles/whiteboard.scss'
import { Snippet } from '../../types'
import Caret from '../../utils/caret'
import {
  generateSnippet,
  generateParagraph,
} from '../../utils/generate-snippet'
import withPixel from '../../utils/with-pixel'
import SnippetContext, {
  SnippetContextProps,
} from '../SnippetContext/SnippetContext'
import WhiteboardOptionController from '../WhiteboardOptionController/WhiteboardOptionController'

export interface WhiteboardProps {
  snippets: Snippet[]
}

const Whiteboard = ({ snippets }: WhiteboardProps) => {
  const whiteboardRef = useRef<HTMLDivElement>(null)

  const [commonFontSize, setCommonFontSize] = useState<number | null>(null)
  const [commonLineHeight, setCommonLineHeight] = useState<number | null>(null)

  const [lastAnchorOffset, setLastAnchorOffset] = useState<number | null>(null)
  const [lastAnchorNode, setLastAnchorNode] = useState<Node | null>(null)
  const [lastParentElement, setLastParentElement] =
    useState<HTMLElement | null>(null)

  const [isSnippetContextOpened, setIsSnippetContextOpened] = useState(false)
  const [snippetContextPosition, setSnippetContextPosition] = useState<{
    x: SnippetContextProps['positionX']
    y: SnippetContextProps['positionY']
  }>({ x: 0, y: 0 })

  const computeWhiteboardStyle = useCallback(() => {
    const style: CSSProperties = {}
    if (commonFontSize) style.fontSize = withPixel(commonFontSize)
    if (commonLineHeight) style.lineHeight = withPixel(commonLineHeight)

    return style
  }, [commonFontSize, commonLineHeight])

  const openSnippetContext = (x: number, y: number) => {
    setSnippetContextPosition({ x, y })
    setIsSnippetContextOpened(true)
  }

  const onWhiteboardKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    const { key } = event
    if (key === DEFAULT_SETTINGS.DELIMITER_KEY) {
      try {
        setLastAnchorOffset(Caret.anchorOffset())
        setLastAnchorNode(Caret.anchorNode())
        setLastParentElement(Caret.parentElement())

        const { x, y } = Caret.rect()
        openSnippetContext(x, y)
      } catch (e) {
        if (e instanceof Error) {
          alert(e.message)
        } else {
          alert('Unexpected error is occurred')
        }
      }
    }

    if (
      !event.currentTarget.textContent &&
      event.currentTarget.childElementCount === 1 &&
      event.key === 'Backspace'
    ) {
      event.preventDefault()
    }
  }

  const restoreCaret = () => {
    if (!lastAnchorNode || lastAnchorOffset == null) return
    Caret.placeCaret(lastAnchorNode, lastAnchorOffset)
  }

  const appendNewSnippet = (snippet: Snippet) => {
    if (!lastParentElement || !lastAnchorNode?.textContent) return

    const snippetElement = generateSnippet(snippet)
    lastParentElement.insertBefore(snippetElement, lastAnchorNode.nextSibling)
    lastAnchorNode.textContent = lastAnchorNode.textContent.replace(/:$/, '')

    Caret.placeCaret(snippetElement)
  }

  const appendParagraph = () => {
    if (!whiteboardRef.current) return
    const paragraph = generateParagraph()
    whiteboardRef.current.appendChild(paragraph)
    const phrase = paragraph.firstElementChild
    if (phrase) Caret.placeCaret(phrase)
  }

  const onPhraseKeyUp = (phrase: HTMLElement) => {
    if (!phrase.childElementCount) {
      if (phrase.style.display !== 'inline-block') {
        phrase.style.display = 'inline-block'
      }
    } else {
      if (phrase.style.display !== 'inline') {
        phrase.style.display = 'inline'
      }
    }
  }

  const onSnippetKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.shiftKey && event.key === 'Enter') {
      event.preventDefault()
      Caret.escapeCaret()
    }
  }

  return (
    <section id="snippeter-whiteboard">
      <WhiteboardOptionController
        onFontSizeChangeHandler={setCommonFontSize}
        onLineHeightChangeHandler={setCommonLineHeight}
      />

      {isSnippetContextOpened && (
        <SnippetContext
          positionX={snippetContextPosition.x}
          positionY={snippetContextPosition.y}
          snippets={snippets}
          onContextCloseHandler={(snippet) => {
            setIsSnippetContextOpened(false)

            if (!snippet) {
              restoreCaret()
            } else {
              appendNewSnippet(snippet)
            }

            setLastParentElement(null)
            setLastAnchorNode(null)
            setLastAnchorOffset(null)
          }}
        />
      )}

      <div
        id="whiteboard"
        style={computeWhiteboardStyle()}
        ref={whiteboardRef}
        onKeyUp={(event) => {
          const anchorNode = Caret.anchorNode()
          const parentElement = anchorNode.parentElement
          if (!parentElement) return

          if (
            anchorNode instanceof HTMLElement &&
            anchorNode.hasAttribute(PHRASE_ATTRIBUTE)
          ) {
            onPhraseKeyUp(anchorNode)
          }

          onWhiteboardKeyUp(event)
        }}
        onKeyDown={(event) => {
          const parentElement = Caret.anchorNode().parentElement
          if (!parentElement) return

          if (parentElement.hasAttribute(SNIPPET_ATTRIBUTE)) {
            onSnippetKeyDown(event)
          }
        }}
        onClick={(event) => {
          if (event.currentTarget.childElementCount === 0) appendParagraph()
        }}
      ></div>
    </section>
  )
}

export default Whiteboard
