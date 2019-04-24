import React from 'react'
import { connect } from 'react-redux'
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
} from 'reactstrap'
import { NavLink } from 'react-router-dom'

import './style.css'
import { clickRepo } from '../../actions/navLinkClick'
import { REPO_PATH_PREFIX } from '../../constants'
import { getUpdateString } from '../../utilities'

export function ListItem(props) {
  const { item, clickRepoFunc } = props
  // eslint-disable-next-line
  const { name, html_url: htmlUrl, updated_at: lastUpdated } = item

  const repoClicked = () => {
    clickRepoFunc(item)
  }

  const updatedAgo = getUpdateString(lastUpdated)

  return (
    <div className="list-item p-3">
      <NavLink className="ns-link" onClick={repoClicked} to={`/${REPO_PATH_PREFIX}/${name}`}>
        <Card className="ns-card">
          <CardBody>
            <Row>
              <Col xs="auto">
                <CardTitle>
                  {name}
                </CardTitle>
              </Col>
              <Col xs="auto">
                <CardTitle>
                  Last updated {updatedAgo}
                </CardTitle>
              </Col>
            </Row>
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
