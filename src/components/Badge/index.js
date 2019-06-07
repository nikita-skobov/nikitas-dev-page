import React from 'react'
import { connect } from 'react-redux'

import './style.css'
import { makeBadge } from '../../utilities/badges'
import { BADGE_COMPONENT_CLASS_NAME } from '../../constants'

export function Badge(props) {
  const {
    colorA = '#6c757d', // bootstrap secondary
    colorB = '#007bff', // bootstrap primary
    textA,
    textB,
    template = 'flat',
  } = props

  const badge = makeBadge({
    template,
    colorA,
    colorB,
    text: [textA, textB],
  })

  const svgencoded = encodeURIComponent(badge)
  const datauri = `data:image/svg+xml,${svgencoded}`

  return <img className={`${BADGE_COMPONENT_CLASS_NAME} ns-badge-height`} src={datauri} alt="Unable to load svg badge" />
}

export default connect()(Badge)
