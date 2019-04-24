import React from 'react'
import { connect } from 'react-redux'
import { Card, CardText, CardBody } from 'reactstrap'
import { NavLink } from 'react-router-dom'

export function ListItem(props) {
  // eslint-disable-next-line
  const { name, html_url: htmlUrl } = props

  return (
    <div className="list-item p-3">
      <Card inverse color="info">
        <CardBody>
          <CardText>{name}</CardText>
          <CardText>
            <a href={htmlUrl}>{name}</a>
          </CardText>
          <CardText>
            <NavLink to={`/repo/${name}`}>NAVLINK: {name}</NavLink>
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
}

export default connect(mapStateToProps, mapActionsToProps)(ListItem)
