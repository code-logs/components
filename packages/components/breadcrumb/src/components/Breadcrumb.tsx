import React from 'react'
import { Path } from '../types'
import '../styles/breadcrumb.scss'

export interface BreadcrumbProps {
  paths: Path[]
  delimiter?: React.ReactElement
  onRoute?: (route: Path['route']) => void
}

const Breadcrumb = ({
  paths,
  delimiter = <span>{' > '}</span>,
  onRoute,
}: BreadcrumbProps) => {
  const renderBreadcrumb = (
    { name, route }: Path,
    appendDelimiter: boolean
  ) => {
    if (route) {
      return (
        <>
          <a
            className="list-item anchor"
            href={route}
            onClick={(event) => {
              if (!onRoute) return
              event.preventDefault()
              onRoute(route)
            }}
          >
            {name}
          </a>
          {appendDelimiter ? delimiter : <></>}
        </>
      )
    } else {
      return (
        <>
          <span className="list-item">{name}</span>
          {appendDelimiter ? delimiter : <></>}
        </>
      )
    }
  }

  if (!paths.length) return <></>

  return (
    <section className="breadcrumb">
      <ol className="list">
        {paths.map((path, index) => (
          <li key={path.name} className="name">
            {renderBreadcrumb(path, index < paths.length - 1)}
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Breadcrumb
