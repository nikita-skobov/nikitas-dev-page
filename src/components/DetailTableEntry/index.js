import React from 'react'

import { DETAIL_TABLE_ENTRY_COMPONENT_CLASS_NAME } from '../../constants'

export function DetailTableEntry(props) {
  const { children } = props
  const trueProps = { ...props }
  delete trueProps.children
  const child = children
  const { label, cellPadding } = trueProps

  const defaultCellPadding = 0
  const numCellsToPad = cellPadding === undefined ? defaultCellPadding : cellPadding
  const paddingCells = []
  for (let i = 0; i < numCellsToPad; i += 1) {
    paddingCells.push(<td key={`pad${i}`} />)
  }

  return (
    <tr className={DETAIL_TABLE_ENTRY_COMPONENT_CLASS_NAME}>
      <th scope="row">{label}</th>
      <td>{child}</td>
      {paddingCells}
    </tr>
  )
}

export default DetailTableEntry
