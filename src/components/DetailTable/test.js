/* global expect describe it */
import * as React from 'react'
// eslint-disable-next-line
import { shallow } from 'enzyme'

import { DetailTable } from './index'
import { DETAIL_TABLE_COMPONENT_CLASS_NAME } from '../../constants'

describe('the list component', () => {
  it('should render', () => {
    const wrapper = shallow(<DetailTable />)
    const trElm = wrapper.find(`.${DETAIL_TABLE_COMPONENT_CLASS_NAME}`)
    expect(trElm.exists()).toBeTruthy()
  })

  it('should render children inside a table body', () => {
    const wrapper = shallow(<DetailTable><div>child1</div><div>child2</div></DetailTable>)
    const tbody = wrapper.find('tbody')
    expect(tbody.exists()).toBeTruthy()
    expect(tbody.children().get(0).props.children).toBe('child1')
    expect(tbody.children().get(1).props.children).toBe('child2')
  })
})
