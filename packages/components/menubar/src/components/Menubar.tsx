import React, { MouseEvent, useState } from 'react'
import '../styles/menubar.scss'
import { GroupMenu, Menu, MenuItem } from '../types'
import MenuItems, { MenuItemsProps } from './MenuItems'

export interface MenubarProps {
  menus: Menu[]
  menuAlign?: 'left' | 'center' | 'right'
  onRoute: MenuItemsProps['onRoute']
  activeChecker?: MenuItemsProps['activeChecker']
}

const Menubar = ({
  menus,
  menuAlign = 'center',
  onRoute,
  activeChecker,
}: MenubarProps) => {
  const [toggledMenuIndex, setToggledMenuIndex] = useState(-1)
  const [subMenus, setSubMenus] = useState<MenuItem[]>(
    'subMenus' in menus[0] ? menus[0].subMenus : []
  )
  const [menuItemPositionX, setMenuItemPositionX] = useState<number | null>(
    null
  )
  const [menuItemPositionY, setMenuItemPositionY] = useState<number | null>(
    null
  )

  const groupMenuClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    const index = Number(button.dataset.index)

    if (index === toggledMenuIndex) {
      setToggledMenuIndex(-1)
    } else {
      setToggledMenuIndex(index)
      setSubMenus((menus[index] as GroupMenu).subMenus)
    }

    const { left, bottom } = button.getBoundingClientRect()
    setMenuItemPositionX(left)
    setMenuItemPositionY(bottom)
  }

  const menuItemClickHandler = (route: string) => {
    setToggledMenuIndex(-1)
    onRoute(route)
  }

  return (
    <div className={`menubar align-${menuAlign}`}>
      {menus.map((menu, index) => {
        if ('subMenus' in menu) {
          const { name } = menu
          return (
            <button
              type="button"
              key={name}
              data-index={index}
              onClick={groupMenuClickHandler}
            >
              {name}
            </button>
          )
        } else {
          const { name, route } = menu
          return (
            <button
              type="button"
              key={name}
              data-index={index}
              onClick={() => menuItemClickHandler(route)}
            >
              {name}
            </button>
          )
        }
      })}

      {subMenus && menuItemPositionX && menuItemPositionY && (
        <MenuItems
          toggled={toggledMenuIndex >= 0}
          menus={subMenus}
          positionX={menuItemPositionX}
          positionY={menuItemPositionY}
          activeChecker={activeChecker}
          onRoute={menuItemClickHandler}
        />
      )}
    </div>
  )
}

export default Menubar
