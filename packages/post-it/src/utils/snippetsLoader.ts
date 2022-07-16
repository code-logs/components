import { Snippet } from '@code-logs/snippeter'

const SNIPPETS_LOCAL_STORAGE_KEY = 'SNIPPETS' as const

const snippetLoader = {
  get(): Snippet[] {
    const snippets = localStorage.getItem(SNIPPETS_LOCAL_STORAGE_KEY)
    if (snippets) return JSON.parse(snippets)
    return []
  },

  update(snippets: Snippet[]) {
    localStorage.setItem(SNIPPETS_LOCAL_STORAGE_KEY, JSON.stringify(snippets))
  },
}

export default snippetLoader
