/* global expect describe it beforeEach */
import * as React from 'react'
import { Provider } from 'react-redux'
// eslint-disable-next-line
import { mount } from 'enzyme'

import { setupStore } from '../../setupStore'
import ConnectedList from './index'

describe('the list component', () => {
  let store

  beforeEach(() => {
    store = setupStore()
  })

  it('should render', () => {
    const wrapper = mount(<Provider store={store}><ConnectedList /></Provider>)
    const divElm = wrapper.find('div')
    expect(divElm.exists()).toBeTruthy()
  })
})
