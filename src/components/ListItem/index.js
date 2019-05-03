import React from 'react'
import { connect } from 'react-redux'
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap'
import { NavLink } from 'react-router-dom'

import './style.css'
import { clickRepo } from '../../actions/navLinkClick'
import { REPO_PATH_PREFIX, LIST_ITEM_COMPONENT_CLASS_NAME } from '../../constants'
import { getUpdateString } from '../../utilities'

export function ListItem(props) {
  const { item, clickRepoFunc } = props
  // eslint-disable-next-line
  const { name, html_url: htmlUrl, pushed_at: lastUpdated } = item

  const repoClicked = () => {
    clickRepoFunc(item)
  }

  const updatedAgo = getUpdateString(lastUpdated)

  return (
    <div className={`${LIST_ITEM_COMPONENT_CLASS_NAME} p-3`}>
      <NavLink className="ns-link" onClick={repoClicked} to={`/${REPO_PATH_PREFIX}/${name}`}>
        <ListGroupItem>
          <ListGroupItemHeading>{name}</ListGroupItemHeading>
          <ListGroupItemText>Last updated {updatedAgo}</ListGroupItemText>
        </ListGroupItem>
      </NavLink>
    </div>
  )
}

const mapStateToProps = state => ({
  ...state,
})

const mapActionsToProps = {
  clickRepoFunc: clickRepo,
}

export default connect(mapStateToProps, mapActionsToProps)(ListItem)
