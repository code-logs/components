import React, {
  CSSProperties,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from 'react'
import { DEFAULT_SETTINGS } from '../../constants'
import '../../styles/whiteboard.scss'
import { Snippet } from '../../types'
import Caret from '../../utils/caret'
import {
  generateEditableSnippet,
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
  const [lastParentNode, setLastParentNode] = useState<Node | null>(null)

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

  const onKeyUpHandler = ({ key }: KeyboardEvent<HTMLDivElement>) => {
    if (key !== DEFAULT_SETTINGS.DELIMITER_KEY) return

    try {
      setLastAnchorOffset(Caret.anchorOffset())
      setLastAnchorNode(Caret.anchorNode())
      setLastParentNode(Caret.parentNode())

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

  const restoreCaret = () => {
    if (!lastAnchorNode || lastAnchorOffset == null) return
    Caret.placeCaret(lastAnchorNode, lastAnchorOffset)
  }

  const appendNewSnippet = (snippet: Snippet) => {
    if (!lastParentNode || !lastAnchorNode?.textContent) return

    const snippetElement = generateEditableSnippet(snippet)
    lastParentNode.insertBefore(snippetElement, lastAnchorNode.nextSibling)
    lastAnchorNode.textContent = lastAnchorNode.textContent.replace(/:$/, '')

    Caret.placeCaret(snippetElement)
  }

  const appendParagraph = () => {
    if (!whiteboardRef.current) return
    const paragraph = generateParagraph()
    whiteboardRef.current.appendChild(paragraph)
  }

  const onWhiteboardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      !event.currentTarget.textContent &&
      event.currentTarget.childElementCount === 1 &&
      event.key === 'Backspace'
    ) {
      event.preventDefault()
    }
  }

  const onSnippetKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
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

            setLastParentNode(null)
            setLastAnchorNode(null)
            setLastAnchorOffset(null)
          }}
        />
      )}

      <div
        id="whiteboard"
        style={computeWhiteboardStyle()}
        ref={whiteboardRef}
        contentEditable
        onKeyUp={onKeyUpHandler}
        onKeyDown={(event) => {
          const parentElement = Caret.anchorNode().parentElement
          if (!parentElement) return
          if (parentElement.hasAttribute('snippet')) {
            onSnippetKeyDown(event)
          } else {
            onWhiteboardKeyDown(event)
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
