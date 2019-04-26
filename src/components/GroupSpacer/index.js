import React from 'react'
import { connect } from 'react-redux'

import './style.css'

export function GroupSpacer(props) {
  const { children } = props

  const lastBadgeIndex = children.length - 1
  const componentList = []
  children.forEach((child, index) => {
    componentList.push(child)
    if (index % 2 === 0 && index !== lastBadgeIndex) {
      // add a divider component between all the children
      // do not add a divider at the end of the list, though
      componentList.push(<div className="ns-divider" />)
    }
  })
  return componentList
}

export default connect()(GroupSpacer)
