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

  it('should have 2 buttons as children', () => {
    const wrapper = mount(<Badge />)
    const numButtons = wrapper.find('button').length
    expect(numButtons).toBe(2)
  })

  it('should use defaults for colorA, colorB and size props', () => {
    const wrapper = mount(<Badge />)
    const buttons = wrapper.find('button')
    const button1 = buttons.get(0)
    const button2 = buttons.get(1)

    // first button should have colorA default: secondary
    expect(button1.props.className).toMatch('secondary')
    // first button should have size default: sm
    expect(button1.props.className).toMatch('sm')

    // second button should have colorB default: success
    expect(button2.props.className).toMatch('primary')
    // second button should have size default: sm
    expect(button2.props.className).toMatch('sm')
  })

  it('should be able to override the defaults', () => {
    const wrapper = mount(<Badge colorA="info" colorB="danger" size="lg" />)
    const buttons = wrapper.find('button')
    const button1 = buttons.get(0)
    const button2 = buttons.get(1)

    expect(button1.props.className).toMatch('info')
    expect(button1.props.className).toMatch('lg')

    expect(button2.props.className).toMatch('danger')
    expect(button2.props.className).toMatch('lg')
  })

  it('should render textA in first button, textB in second button', () => {
    const textA = 'dsadsadsa'
    const textB = '3243erwrewrew'
    const wrapper = mount(<Badge textA={textA} textB={textB} />)
    const buttons = wrapper.find('button')
    const button1 = buttons.get(0)
    const button2 = buttons.get(1)

    expect(button1.props.children).toBe(textA)
    expect(button2.props.children).toBe(textB)
  })
})
