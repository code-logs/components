import { Snippet } from './../types/Snippet'

interface DefaultSettings {
  SNIPPETS: Snippet[]
}

export const DEFAULT_SETTINGS: DefaultSettings = {
  SNIPPETS: [
    { key: '#', tag: 'h1' },
    { key: '##', tag: 'h2' },
    { key: '###', tag: 'h3' },
    { key: 'str', tag: 'strong' },
    { key: '>', tag: 'blockquote' },
    { key: '```', tag: 'code' },
  ],
}
