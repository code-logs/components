// Button.stories.ts|tsx

import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Wysiwyg from '../src'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Wysiwyg',
  component: Wysiwyg,
} as ComponentMeta<typeof Wysiwyg>

export const Primary: ComponentStory<typeof Wysiwyg> = () => <Wysiwyg />
