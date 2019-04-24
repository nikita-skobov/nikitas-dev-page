/* global expect describe it beforeEach fetch */
import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
// eslint-disable-next-line
import { mount } from 'enzyme'

import { flushAllPromises } from '../../utilities'
import { setupStore } from '../../setupStore'
import ConnectedList from './index'

describe('the list component', () => {
  let store

  beforeEach(() => {
    store = setupStore()
  })

  it('should render', () => {
    const wrapper = mount(<Provider store={store}><Router><ConnectedList /></Router></Provider>)
    const divElm = wrapper.find('div')
    expect(divElm.exists()).toBeTruthy()
  })

  it('should render a loading spinner at first', () => {
    const wrapper = mount(<Provider store={store}><Router><ConnectedList /></Router></Provider>)
    const htmlstring = wrapper.html()
    expect(htmlstring).toContain('spinner-border')
  })

  it('should render an error if list is not an array', () => {
    store = setupStore(undefined, { repoList: { list: undefined } })
    const wrapper = mount(<Provider store={store}><Router><ConnectedList /></Router></Provider>)
    const htmlstring = wrapper.html()
    expect(htmlstring).not.toContain('spinner-border')
  })

  it('should render a list of N ListItems after it fetches', async () => {
    const N = 20
    fetch.mockResponseOnce(JSON.stringify(
      [
        ...Array(N).fill({ some: 'object' }),
      ],
    ))

    const wrapper = mount(<Provider store={store}><Router><ConnectedList /></Router></Provider>)
    await flushAllPromises()
    wrapper.update()
    expect(wrapper.find('.list-item').length).toEqual(N)
  })

  it('should not render any repositories that are forks', async () => {
    const N = 20
    fetch.mockResponseOnce(JSON.stringify(
      [
        ...Array(N).fill({ fork: false }),
        { fork: true },
      ],
    ))

    const wrapper = mount(<Provider store={store}><Router><ConnectedList /></Router></Provider>)
    await flushAllPromises()
    wrapper.update()
    expect(wrapper.find('.list-item').length).not.toEqual(N + 1)
  })
})
