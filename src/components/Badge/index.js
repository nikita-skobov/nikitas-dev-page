import React from 'react'
import { Button, ButtonGroup } from 'reactstrap'
import { connect } from 'react-redux'

import './style.css'
import { BADGE_COMPONENT_CLASS_NAME } from '../../constants'

export function Badge(props) {
  const {
    colorA = 'secondary',
    colorB = 'primary',
    textA,
    textB,
    size = 'sm',
  } = props

  return (
    <ButtonGroup className={BADGE_COMPONENT_CLASS_NAME}>
      <Button disabled style={{ opacity: 1 }} size={size} color={colorA}>
        {textA}
      </Button>
      <Button disabled style={{ opacity: 1 }} size={size} color={colorB}>
        {textB}
      </Button>
    </ButtonGroup>
  )
}

export default connect()(Badge)
