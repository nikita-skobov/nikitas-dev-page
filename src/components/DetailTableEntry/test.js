/* global expect describe it */
import * as React from 'react'
// eslint-disable-next-line
import { shallow } from 'enzyme'

import { DetailTableEntry } from './index'
import { DETAIL_TABLE_ENTRY_COMPONENT_CLASS_NAME } from '../../constants'

describe('the list component', () => {
  it('should render', () => {
    const wrapper = shallow(<DetailTableEntry />)
    const trElm = wrapper.find(`.${DETAIL_TABLE_ENTRY_COMPONENT_CLASS_NAME}`)
    expect(trElm.exists()).toBeTruthy()
    expect(trElm.getElement().type).toBe('tr')
  })

  it('should render the label prop inside a th element', () => {
    const labelText = 'somelabel text'
    const wrapper = shallow(<DetailTableEntry label={labelText} />)
    const thElm = wrapper.find('th')
    expect(thElm.text()).toBe(labelText)
  })

  it('should render the child text in a td element directly after the th element', () => {
    const childText = 'child text'
    const wrapper = shallow(<DetailTableEntry label="label">{childText}</DetailTableEntry>)
    const children = wrapper.children()
    expect(children.get(0).type).toBe('th')
    expect(children.get(1).type).toBe('td')
    expect(children.get(1).props.children).toBe(childText)
  })

  it('should render the th element with a scope="row" attribute', () => {
    const wrapper = shallow(<DetailTableEntry />)
    expect(wrapper.find('th').getElement().props.scope).toBe('row')
  })

  it('should add N <td /> elements after the childText if given cellPadding=N', () => {
    const N = 7
    const wrapper = shallow(<DetailTableEntry cellPadding={N}>childText</DetailTableEntry>)
    // N + 1 because the first td element is the childText
    expect(wrapper.find('td').length).toBe(N + 1)
  })
})
