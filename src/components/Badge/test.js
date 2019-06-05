/* global expect describe it */
import * as React from 'react'
// eslint-disable-next-line
import { mount, shallow } from 'enzyme'

import { Badge } from './index'
import { BADGE_COMPONENT_CLASS_NAME } from '../../constants'

describe('badge component', () => {
  it('should render', () => {
    const wrapper = mount(<Badge />)
    expect(wrapper.find(`.${BADGE_COMPONENT_CLASS_NAME}`).exists()).toBeTruthy()
  })

  it('should have a single img element', () => {
    const wrapper = mount(<Badge />)
    const imgElement = wrapper.find('img')
    expect(imgElement).toHaveLength(1)
  })

  it('should have the image source be an svg data uri', () => {
    const wrapper = mount(<Badge />)
    const imgElement = wrapper.find('img')
    const { src } = imgElement.getElement().props
    expect(src.substr(0, 18)).toEqual('data:image/svg+xml')
  })
})
