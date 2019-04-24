import React from 'react'
import { connect } from 'react-redux'
import { Card, CardText, CardBody } from 'reactstrap'
import { NavLink } from 'react-router-dom'

import { clickRepo } from '../../actions/navLinkClick'
import { REPO_PATH_PREFIX } from '../../constants'

export function ListItem(props) {
  const { item, clickRepoFunc } = props
  // eslint-disable-next-line
  const { name, html_url: htmlUrl } = item

  const repoClicked = () => {
    clickRepoFunc(item)
  }

  return (
    <div className="list-item p-3">
      <Card inverse color="info">
        <CardBody>
          <CardText>{name}</CardText>
          <CardText>
            <NavLink onClick={repoClicked} to={`/${REPO_PATH_PREFIX}/${name}`}>NAVLINK: {name}</NavLink>
          </CardText>
        </CardBody>
      </Card>
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
