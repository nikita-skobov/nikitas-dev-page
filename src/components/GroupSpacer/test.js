/* global expect describe it */
import * as React from 'react'
// eslint-disable-next-line
import { mount } from 'enzyme'

import { GroupSpacer } from './index'
import { GROUP_SPACER_COMPONENT_CLASS_NAME } from '../../constants'

describe('group spacer component', () => {
  it('should render', () => {
    const wrapper = mount(<GroupSpacer><div /><div /></GroupSpacer>)
    expect(wrapper.find(`.${GROUP_SPACER_COMPONENT_CLASS_NAME}`).exists()).toBeTruthy()
  })

  it('should work even if only given one child', () => {
    const wrapper = mount(<GroupSpacer><div /></GroupSpacer>)
    // one div for parent wrapper, and one div for the child
    expect(wrapper.find('div').length).toBe(2)
  })

  it('should not add a divider after the last child component', () => {
    const wrapper = mount(<GroupSpacer><div /><div /></GroupSpacer>)
    const numDividers = wrapper.find('.ns-divider').length
    expect(numDividers).toBe(1)
  })

  it('should have N-1 dividers if there are N children', () => {
    const N = 5
    const children = Array(N).fill(<div />)
    const wrapper = mount(<GroupSpacer>{children}</GroupSpacer>)
    const numDividers = wrapper.find('.ns-divider').length
    expect(numDividers).toBe(N - 1)
  })
})
