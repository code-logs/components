import Snippeter, { Snippet } from '@code-logs/snippeter'
import { useEffect, useState } from 'react'
import snippetLoader from '../utils/snippetsLoader'

const NewPost = () => {
  const [snippets, setSnippets] = useState<Snippet[]>(snippetLoader.get())

  useEffect(() => {
    snippetLoader.update(snippets)
  }, [snippets])

  return (
    <>
      <Snippeter snippets={snippets} onSnippetsChangeHandler={setSnippets} />
    </>
  )
}

export default NewPost
