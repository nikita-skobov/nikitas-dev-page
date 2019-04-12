/* global describe it expect */
import React from 'react'
import { shallow } from 'enzyme'

import { DogApp } from './dogApp'
import RandomDog from '../randomDog/randomDog'

describe('App component', () => {
  it('renders RandomDog component', () => {
    const wrapper = shallow(<DogApp />)
    expect(wrapper.contains(<RandomDog />)).toBe(true)
  })
})
