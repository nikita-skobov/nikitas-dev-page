import React from 'react'
import { Table } from 'reactstrap'

import { DETAIL_TABLE_COMPONENT_CLASS_NAME } from '../../constants'

export function DetailTable(props) {
  const { children } = props

  return (
    <div className={DETAIL_TABLE_COMPONENT_CLASS_NAME}>
      <Table responsive striped>
        <tbody>
          {children}
        </tbody>
      </Table>
    </div>
  )
}

export default DetailTable
