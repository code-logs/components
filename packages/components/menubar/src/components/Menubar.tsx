import React, { MouseEvent, useState } from 'react'
import '../styles/menubar.scss'
import { GroupMenu, MenuItem } from '../types'
import MenuItems, { MenuItemsProps } from './MenuItems'

export interface MenubarProps {
  menus: GroupMenu[]
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
  const [subMenus, setSubMenus] = useState<MenuItem[]>(menus[0].subMenus)
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
      setSubMenus(menus[index].subMenus)
    }

    const { left, bottom } = button.getBoundingClientRect()
    setMenuItemPositionX(left)
    setMenuItemPositionY(bottom)
  }

  return (
    <div className={`menubar align-${menuAlign}`}>
      {menus.map(({ name }, index) => (
        <button
          type="button"
          key={name}
          data-index={index}
          onClick={groupMenuClickHandler}
        >
          {name}
        </button>
      ))}

      {subMenus && menuItemPositionX && menuItemPositionY && (
        <MenuItems
          toggled={toggledMenuIndex >= 0}
          menus={subMenus}
          positionX={menuItemPositionX}
          positionY={menuItemPositionY}
          activeChecker={activeChecker}
          onRoute={(route) => {
            setToggledMenuIndex(-1)
            onRoute(route)
          }}
        />
      )}
    </div>
  )
}

export default Menubar
