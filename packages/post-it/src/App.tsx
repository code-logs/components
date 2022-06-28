import React from 'react'
import Wysiwyg from '@code-logs/wysiwyg'
import './styles/global.scss'

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <div id="wysiwyg-container">
          <Wysiwyg />
        </div>
      </main>
    </div>
  )
}

export default App
