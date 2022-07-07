import { PARAGRAPH_ATTRIBUTE } from './../constants'
import { generatePhrase } from './generate-snippet'
class Caret {
  public static rect() {
    return this.getSelection().getRangeAt(0).getBoundingClientRect()
  }

  private static getSelection() {
    const selection = document.getSelection()
    if (!selection) throw new Error('Failed to find selection')

    return selection
  }

  public static anchorOffset() {
    return this.getSelection().anchorOffset
  }

  public static anchorNode() {
    const anchorNode = this.getSelection().anchorNode
    if (!anchorNode) throw new Error('Failed to find anchor node')

    return anchorNode
  }

  public static parentNode() {
    const parentNode = this.anchorNode().parentNode
    if (!parentNode) throw new Error('Failed to find parent node')

    return parentNode
  }

  public static placeCaret(editableElement: HTMLElement | Node, offset = 0) {
    const selection = this.getSelection()
    const range = document.createRange()
    range.setStart(editableElement, offset)
    range.collapse(true)

    selection.removeAllRanges()
    selection.addRange(range)
  }

  public static escapeCaret() {
    let paragraph = this.anchorNode().parentElement
    while (paragraph && !paragraph.hasAttribute(PARAGRAPH_ATTRIBUTE)) {
      paragraph = paragraph.parentElement
    }

    if (!paragraph) throw new Error('Failed to find paragraph')

    const phrase = generatePhrase()
    paragraph.append(phrase)
    this.placeCaret(phrase)
  }
}

export default Caret
