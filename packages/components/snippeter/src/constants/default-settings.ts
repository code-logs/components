import { Snippet } from './../types/Snippet'

interface DefaultSettings {
  DELIMITER_KEY: string
  SNIPPETS: Snippet[]
}

export const DEFAULT_SETTINGS: DefaultSettings = {
  DELIMITER_KEY: ':',
  SNIPPETS: [
    { key: '#', tag: 'h1' },
    { key: '##', tag: 'h2' },
    { key: '###', tag: 'h3' },
    { key: 'str', tag: 'strong' },
    { key: '>', tag: 'blockquote' },
    { key: '```', tag: 'code' },
  ],
}
