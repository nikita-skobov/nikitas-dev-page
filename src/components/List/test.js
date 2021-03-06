/* global expect describe it beforeEach fetch jest */
import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
// eslint-disable-next-line
import { mount } from 'enzyme'

import { flushAllPromises } from '../../utilities'
import { setupStore } from '../../setupStore'
import ConnectedList from './index'
import { LIST_ITEM_COMPONENT_CLASS_NAME, LIST_COMPONENT_CLASS_NAME } from '../../constants'

describe('the list component', () => {
  let store

  beforeEach(() => {
    fetch.mock.calls = []
    fetch.mock.instances = []
    fetch.mock.invocationCallOrder = []
    fetch.mock.results = []
    store = setupStore()
  })

  it('should render', () => {
    const wrapper = mount(<Provider store={store}><Router><ConnectedList /></Router></Provider>)
    const divElm = wrapper.find(`.${LIST_COMPONENT_CLASS_NAME}`)
    expect(divElm.exists()).toBeTruthy()
  })

  it('should render a loading spinner at first', () => {
    const wrapper = mount(<Provider store={store}><Router><ConnectedList /></Router></Provider>)
    const htmlstring = wrapper.html()
    expect(htmlstring).toContain('spinner-border')
  })

  it('should render an error if list is not an array', () => {
    const store2 = setupStore(undefined, { repoList: { list: undefined } })
    const wrapper = mount(<Provider store={store2}><Router><ConnectedList /></Router></Provider>)
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
    expect(wrapper.find(`.${LIST_ITEM_COMPONENT_CLASS_NAME}`).length).toEqual(N)
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

  it('should fetch if the list is empty', async () => {
    const store2 = setupStore(undefined, { repoList: { list: [] } })
    mount(<Provider store={store2}><Router><ConnectedList /></Router></Provider>)
    await flushAllPromises()
    expect(fetch.mock.calls.length).toBe(1)
  })

  it('should NOT fetch if the list is not empty', async () => {
    const store2 = setupStore(undefined, { repoList: { list: [{ some: 'object' }] } })
    mount(<Provider store={store2}><Router><ConnectedList /></Router></Provider>)
    await flushAllPromises()
    expect(fetch.mock.calls.length).toBe(0)
  })
})
