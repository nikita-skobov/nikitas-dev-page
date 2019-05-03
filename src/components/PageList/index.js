import React from 'react'
import { connect } from 'react-redux'
import {
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap'
import { NavLink } from 'react-router-dom'

import { PAGE_LIST_COMPONENT_CLASS_NAME, REPO_PATH_PREFIX } from '../../constants'

export function PageList(props) {
  const { pathname, numSlashes } = props

  if (pathname === '/') return null

  let crumbItems = []
  let homeHref = '../'
  for (let i = 1; i < numSlashes; i += 1) {
    homeHref = `${homeHref}../`
  }

  const paths = pathname.split('/')

  if (numSlashes === 2) {
    crumbItems.push(<BreadcrumbItem key="paths22" tag="span">{paths[2]}</BreadcrumbItem>)
    crumbItems.push(<BreadcrumbItem key="repos2" tag="span"><NavLink className="ns-link" to={`/${REPO_PATH_PREFIX}`}>Repos</NavLink></BreadcrumbItem>)
    crumbItems.push(<BreadcrumbItem key="home2" tag="span"><NavLink className="ns-link" to="/">Home</NavLink></BreadcrumbItem>)
  }
  if (numSlashes === 1) {
    crumbItems.push(<BreadcrumbItem key="repos1" tag="span">Repos</BreadcrumbItem>)
    crumbItems.push(<BreadcrumbItem key="home1" tag="span"><NavLink className="ns-link" to="/">Home</NavLink></BreadcrumbItem>)
  }
  crumbItems = crumbItems.reverse()

  return (
    <div className={PAGE_LIST_COMPONENT_CLASS_NAME}>
      <Breadcrumb style={{ marginBottom: '-1em' }} tag="nav" listTag="div">
        {crumbItems}
      </Breadcrumb>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps
  const { pathname } = location
  const lastCharIndex = pathname.length - 1
  let numSlashes = (pathname.match(/\//g) || []).length
  if (pathname.charAt(lastCharIndex) === '/') {
    numSlashes -= 1
  }

  return {
    pathname,
    numSlashes,
  }
}


export default connect(mapStateToProps)(PageList)
