import React from 'react'
import { Card, CardText, CardBody } from 'reactstrap'

export default function ListItem(props) {
  const { name } = props

  return (
    <div className="list-item">
      <Card>
        <CardBody>
          <CardText>{name}</CardText>
        </CardBody>
      </Card>
    </div>
  )
}
