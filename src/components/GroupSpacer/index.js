import React from 'react'
import { connect } from 'react-redux'

import './style.css'
import { GROUP_SPACER_COMPONENT_CLASS_NAME } from '../../constants'

export function GroupSpacer(props) {
  const { children } = props

  if (!Array.isArray(children)) {
    return (
      <div className={GROUP_SPACER_COMPONENT_CLASS_NAME}>
        {children}
      </div>
    )
  }

  const lastBadgeIndex = children.length - 1
  const componentList = []
  children.forEach((child, index) => {
    componentList.push(child)
    if (index !== lastBadgeIndex) {
      // add a divider component between all the children
      // do not add a divider at the end of the list, though
      componentList.push(<div className="ns-divider" />)
    }
  })

  return (
    <div className={GROUP_SPACER_COMPONENT_CLASS_NAME}>
      {componentList}
    </div>
  )
}

export default connect()(GroupSpacer)
