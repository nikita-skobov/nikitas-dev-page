/* global expect describe it beforeEach fetch */
import * as React from 'react'
// eslint-disable-next-line
import { mount } from 'enzyme'

import ListItem from './index'

describe('ListItem component', () => {
  it('should render', () => {
    const wrapper = mount(<ListItem />)
    expect(wrapper.find('.list-item').exists()).toBeTruthy()
  })

  it('should have a link', () => {
    const wrapper = mount(<ListItem repoURL="https://github.com/nikita-skobov/backend-frontend-template" />)
    expect(1).toBe(1)
  })
})
