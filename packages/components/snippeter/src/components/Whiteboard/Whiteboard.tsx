import React, {
  CSSProperties,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from 'react'
import {
  DEFAULT_SETTINGS,
  PARAGRAPH_ATTRIBUTE,
  PHRASE_ATTRIBUTE,
  SNIPPET_ATTRIBUTE,
} from '../../constants'
import '../../styles/whiteboard.scss'
import { Snippet } from '../../types'
import Caret from '../../utils/caret'
import {
  generateParagraph,
  generateSnippet,
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

  const [commonFontSize, setCommonFontSize] = useState(16)
  const [commonLineHeight, setCommonLineHeight] = useState(18)

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

  const getCurrentParagraph = () => {
    const anchorElement = Caret.anchorElement()

    let element = anchorElement
    while (element && !element.hasAttribute(PARAGRAPH_ATTRIBUTE)) {
      if (!element.parentElement) throw new Error('Failed to find paragraph')
      element = element.parentElement
    }

    return element
  }

  const openSnippetContext = (x: number, y: number) => {
    setSnippetContextPosition({ x, y })
    setIsSnippetContextOpened(true)
  }

  const onPhraseKeyUp = (phrase: HTMLSpanElement) => {
    if (!phrase.textContent && phrase.style.display !== 'inline-block') {
      phrase.style.display = 'inline-block'
    } else if (phrase.textContent && phrase.style.display !== 'inline') {
      phrase.style.display = 'inline'
    }
  }

  const onSnippetKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.shiftKey && event.key === 'Enter') {
      event.preventDefault()
      Caret.escapeCaret()
    }
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

    const currentParagraph = getCurrentParagraph()
    if (!currentParagraph) appendParagraph()
    if (currentParagraph && !currentParagraph.textContent) {
      currentParagraph.remove()
      appendParagraph()
    }
  }

  const restoreCaret = () => {
    if (!lastAnchorNode || lastAnchorOffset == null) return
    Caret.placeCaret(lastAnchorNode, lastAnchorOffset)
  }

  const injectNewSnippet = (snippet: Snippet) => {
    if (
      !lastParentElement ||
      !lastAnchorNode?.textContent ||
      lastAnchorOffset === null
    ) {
      return
    }

    const textContent = lastAnchorNode.textContent
    const frontTextNode = new Text(textContent.slice(0, lastAnchorOffset - 1))
    const rearTextNode = new Text(textContent.slice(lastAnchorOffset))
    const snippetElement = generateSnippet(snippet)

    lastParentElement.insertBefore(frontTextNode, lastAnchorNode)
    lastParentElement.insertBefore(snippetElement, lastAnchorNode)
    lastParentElement.insertBefore(rearTextNode, lastAnchorNode)

    lastParentElement.removeChild(lastAnchorNode)

    Caret.placeCaret(snippetElement)
  }

  const appendParagraph = () => {
    if (!whiteboardRef.current) return

    const paragraph = generateParagraph()
    whiteboardRef.current.appendChild(paragraph)
    const phrase = paragraph.firstElementChild
    if (phrase) Caret.placeCaret(phrase)
  }

  return (
    <section className="snippeter-whiteboard">
      <WhiteboardOptionController
        fontSize={commonFontSize}
        lineHeight={commonLineHeight}
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
              injectNewSnippet(snippet)
            }

            setLastParentElement(null)
            setLastAnchorNode(null)
            setLastAnchorOffset(null)
          }}
        />
      )}

      <div
        className="whiteboard"
        style={computeWhiteboardStyle()}
        ref={whiteboardRef}
        contentEditable
        onKeyUp={(event) => {
          const currentElement = Caret.anchorElement()

          if (
            currentElement instanceof HTMLSpanElement &&
            currentElement.hasAttribute(PHRASE_ATTRIBUTE)
          ) {
            onPhraseKeyUp(currentElement)
          }

          onWhiteboardKeyUp(event)
        }}
        onKeyDown={(event) => {
          const currentElement = Caret.anchorElement()
          if (currentElement?.hasAttribute(SNIPPET_ATTRIBUTE)) {
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
