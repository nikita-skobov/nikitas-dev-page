import React from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardTitle } from 'reactstrap'
import { NavLink } from 'react-router-dom'

import './style.css'
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
      <NavLink className="ns-link" onClick={repoClicked} to={`/${REPO_PATH_PREFIX}/${name}`}>
        <Card className="ns-card">
          <CardBody>
            <CardTitle>
              {name}
            </CardTitle>
          </CardBody>
        </Card>
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
