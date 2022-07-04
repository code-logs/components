import { Story } from '@storybook/react'
import React, { useState } from 'react'
import { Snippet } from 'types'
import Snippeter, { SnippeterProps } from '../src'

const MY_SNIPPETS_LOCAL_STORAGE_KEY = 'MY_SNIPPETS'

export default {
  title: 'Snippeter',
  component: Snippeter,
}

const Template: Story<SnippeterProps> = () => {
  const [mySnippets, setMySnippets] = useState<Snippet[]>(
    localStorage.getItem(MY_SNIPPETS_LOCAL_STORAGE_KEY)
      ? JSON.parse(
          localStorage.getItem(MY_SNIPPETS_LOCAL_STORAGE_KEY) as string
        )
      : undefined
  )

  return (
    <Snippeter
      snippets={mySnippets}
      onSnippetsChangeHandler={(snippets) => {
        console.log(snippets)
        localStorage.setItem(
          MY_SNIPPETS_LOCAL_STORAGE_KEY,
          JSON.stringify(snippets)
        )

        setMySnippets(snippets)
      }}
    />
  )
}

export const Default = Template.bind({})
