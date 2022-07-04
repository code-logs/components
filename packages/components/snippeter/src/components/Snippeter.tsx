import React, { useState } from 'react'
import { Snippet } from 'types'
import Setting from './Setting/Setting'
import WhiteBoard from './WhiteBoard/WhiteBoard'

export interface SnippeterProps {
  snippets?: Snippet[]
  onSnippetsChangeHandler: (snippets: Snippet[]) => void
}

const Snippeter = ({ snippets, onSnippetsChangeHandler }: SnippeterProps) => {
  const [showSetting, setShowSetting] = useState(false)

  return (
    <section>
      <header>
        <button onClick={() => setShowSetting(true)}>Setting</button>
      </header>

      {showSetting && (
        <Setting
          snippets={snippets}
          onSnippetsChangeHandler={onSnippetsChangeHandler}
          onCloseHandler={() => setShowSetting(false)}
        />
      )}

      <WhiteBoard />
    </section>
  )
}

export default Snippeter
