import React, { CSSProperties } from 'react'
import { Snippet } from '../types'
import withPixel from './with-pixel'

export const generateSampleSnippet = (snippet: Snippet) => {
  return createSnippetElement(snippet, `${snippet.key} - ${snippet.tag}`)
}

export const generateEditableSnippet = ({
  tag,
  fontSize,
  color,
  fontWeight,
  useItalic,
}: Snippet) => {
  const snippetElement = document.createElement(tag)
  if (fontSize) snippetElement.style.fontSize = withPixel(fontSize)
  if (color) snippetElement.style.color = color
  if (fontWeight) snippetElement.style.fontWeight = String(fontWeight)
  if (useItalic) snippetElement.style.fontStyle = 'italic'
  snippetElement.setAttribute('snippet', '')
  snippetElement.setAttribute('contentEditable', '')

  return snippetElement
}

const createSnippetElement = (
  { tag, fontSize, color, fontWeight, useItalic }: Snippet,
  innerText?: string
) => {
  const style: CSSProperties = {}
  if (fontSize) style.fontSize = withPixel(fontSize)
  if (color) style.color = color
  if (fontWeight) style.fontWeight = fontWeight
  if (useItalic) style.fontStyle = 'italic'

  return React.createElement(tag, { style }, innerText)
}

export const generateParagraph = () => {
  const paragraph = document.createElement('p')
  paragraph.setAttribute('contentEditable', '')
  paragraph.classList.add('paragraph')
  paragraph.append(generatePhrase())

  return paragraph
}

const generatePhrase = () => {
  const phrase = document.createElement('span')
  phrase.setAttribute('contentEditable', '')
  phrase.classList.add('phrase')

  return phrase
}
