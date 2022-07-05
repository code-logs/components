import React, { useState } from 'react'
import { DEFAULT_SETTINGS } from '../constants'
import { Snippet } from '../types'
import Setting from './Setting/Setting'
import Whiteboard from './Whiteboard/Whiteboard'

export interface SnippeterProps {
  snippets?: Snippet[]
  onSnippetsChangeHandler: (snippets: Snippet[]) => void
}

const Snippeter = ({
  snippets = DEFAULT_SETTINGS.SNIPPETS,
  onSnippetsChangeHandler,
}: SnippeterProps) => {
  const [isSettingOpened, setIsSettingOpened] = useState(false)

  return (
    <section>
      <header>
        <button onClick={() => setIsSettingOpened(true)}>Setting</button>
      </header>

      {isSettingOpened && (
        <Setting
          snippets={snippets}
          onSnippetsChangeHandler={onSnippetsChangeHandler}
          onCloseHandler={() => setIsSettingOpened(false)}
        />
      )}

      <Whiteboard snippets={snippets} />
    </section>
  )
}

export default Snippeter
