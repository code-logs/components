import './styles/global.scss'
import Snippeter, { Snippet } from '@code-logs/snippeter'
import { useState } from 'react'

function App() {
  const [snippets, setSnippets] = useState<Snippet[]>([])

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <Snippeter onSnippetsChangeHandler={setSnippets} />
      </main>
    </div>
  )
}

export default App
