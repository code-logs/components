import React from 'react'
import Menubar, { MenubarProps } from '../src'

export default {
  title: 'Menubar Example',
  component: Menubar,
  decorators: [
    (Story) => (
      <>
        <header>
          <nav>
            <Story />
          </nav>
        </header>
        <main></main>
      </>
    ),
  ],
}

const Template = (args: MenubarProps) => <Menubar {...args} />
export const Default = Template.bind({})

Default.args = {
  activeChecker: (route) =>
    location.search.indexOf(route.replace(/^\//, '')) >= 0,
  onRoute: console.log,
  menus: [
    { name: '1 Depth Menu', route: '/one-depth-menu' },
    {
      name: 'Menu 1',
      subMenus: [
        { name: 'Menubar Example', route: '/menubar-example--default' },
        { name: 'Sub Menu 1 - 2', route: '/sub-menu-1-2' },
        { name: 'Sub Menu 1 - 3', route: '/sub-menu-1-3' },
      ],
    },
    {
      name: 'Menu 2',
      subMenus: [
        { name: 'Sub Menu 2 - 1', route: '/sub-menu-2-1' },
        { name: 'Sub Menu 2 - 2', route: '/sub-menu-2-2' },
        { name: 'Sub Menu 2 - 3', route: '/sub-menu-2-3' },
      ],
    },
    {
      name: 'Menu 3',
      subMenus: [
        { name: 'Sub Menu 3 - 1', route: '/sub-menu-3-1' },
        { name: 'Sub Menu 3 - 2', route: '/sub-menu-3-2' },
        { name: 'Sub Menu 3 - 3', route: '/sub-menu-3-3' },
      ],
    },
    {
      name: 'Menu 4',
      subMenus: [
        { name: 'Sub Menu 4 - 1', route: '/sub-menu-4-1' },
        { name: 'Sub Menu 4 - 2', route: '/sub-menu-4-2' },
        { name: 'Sub Menu 4 - 3', route: '/sub-menu-4-3' },
      ],
    },
  ],
} as MenubarProps
