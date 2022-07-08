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

    return anchorNode as Node | HTMLElement
  }

  public static anchorElement() {
    const anchorNode = this.anchorNode()
    if (anchorNode instanceof HTMLElement) {
      return anchorNode
    } else {
      return anchorNode.parentElement
    }
  }

  public static parentElement() {
    const parentNode = this.anchorNode().parentElement
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
    const snippet = this.anchorNode().parentElement
    if (!snippet) throw new Error('Failed to find snippet')

    let paragraph = snippet
    while (paragraph && !paragraph.hasAttribute(PARAGRAPH_ATTRIBUTE)) {
      if (!paragraph.parentElement) throw new Error('Failed to find paragraph')
      paragraph = paragraph.parentElement
    }

    const phrase = snippet.parentElement
    if (!phrase) throw new Error('Failed to find phrase')

    let nextPhrase = phrase.nextElementSibling
    if (!nextPhrase || nextPhrase instanceof HTMLBRElement) {
      nextPhrase?.remove()
      nextPhrase = generatePhrase()
      paragraph.insertBefore(nextPhrase, phrase.nextSibling)
    }

    this.placeCaret(nextPhrase)
  }
}

export default Caret
