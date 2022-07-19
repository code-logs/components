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

  private static getParagraph(element: HTMLElement): HTMLParagraphElement {
    let paragraph = element

    while (!paragraph.hasAttribute(PARAGRAPH_ATTRIBUTE)) {
      if (!paragraph.parentElement) {
        throw new Error('No parent element found')
      }

      paragraph = paragraph.parentElement
    }

    return paragraph as HTMLParagraphElement
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
    const snippet = this.anchorElement()
    if (!snippet) throw new Error('Failed to find snippet')

    const paragraph = this.getParagraph(snippet)

    const phrase = snippet.parentElement
    if (!phrase) throw new Error('Failed to find phrase')

    let nextPhrase = phrase.nextElementSibling
    if (!nextPhrase || nextPhrase instanceof HTMLBRElement) {
      nextPhrase?.remove()
      nextPhrase = generatePhrase()
      paragraph.insertBefore(nextPhrase, phrase.nextElementSibling)
    }

    this.placeCaret(nextPhrase)
  }
}

export default Caret
