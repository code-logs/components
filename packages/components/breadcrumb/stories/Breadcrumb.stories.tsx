import React from 'react'
import Breadcrumb, { BreadcrumbProps } from '../src'

export default {
  title: 'Breadcrumb',
  component: Breadcrumb,
}

const Template = (args: BreadcrumbProps) => <Breadcrumb {...args} />
export const Default = Template.bind({})

Default.args = {
  paths: Array.from({ length: 5 }).map((_, idx) => ({
    name: `Breadcrumb ${idx + 1}`,
    route: `/breadcrumb-${idx + 1}`,
  })),
} as BreadcrumbProps
