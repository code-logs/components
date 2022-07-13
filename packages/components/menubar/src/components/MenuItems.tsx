import React, { MouseEvent, useEffect, useState } from 'react'
import { MenuItem } from '../types'
import '../styles/menu-items.scss'

export interface MenuItemsProps {
  toggled: boolean
  menus: MenuItem[]
  positionX: number
  positionY: number
  onRoute: (route: MenuItem['route']) => void
  activeChecker?: (route: MenuItem['route']) => boolean
}

const MenuItems = ({
  toggled,
  menus,
  positionX,
  positionY,
  onRoute,
  activeChecker,
}: MenuItemsProps) => {
  const [visibility, setVisibility] = useState(false)
  const [activatedRoute, setActivatedRoute] = useState<
    MenuItem['route'] | null
  >(null)

  useEffect(() => {
    const checkActivation = (route: MenuItem['route']) => {
      if (activeChecker) return activeChecker(route)
      return location.pathname.indexOf(route) >= 0
    }

    const activatedMenuItem = menus.find(({ route }) => checkActivation(route))
    if (activatedMenuItem) setActivatedRoute(activatedMenuItem.route)
  }, [activeChecker, menus])

  useEffect(() => {
    setVisibility(toggled)
  }, [toggled])

  return (
    <div
      className={`menu-items ${visibility ? 'visible' : ''}`}
      style={{ left: positionX, top: positionY }}
    >
      {menus.map(({ name, route }) => {
        return (
          <a
            className={`menu-item ${activatedRoute === route ? 'active' : ''}`}
            key={route}
            href={route}
            onClick={(event: MouseEvent<HTMLAnchorElement>) => {
              event.preventDefault()
              onRoute(route)
              setActivatedRoute(route)
            }}
          >
            {name}
          </a>
        )
      })}
    </div>
  )
}

export default MenuItems
