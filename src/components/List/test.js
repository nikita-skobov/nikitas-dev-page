/* global expect describe it beforeEach fetch */
import * as React from 'react'
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
    const wrapper = mount(<Provider store={store}><ConnectedList /></Provider>)
    const divElm = wrapper.find('div')
    expect(divElm.exists()).toBeTruthy()
  })

  it('should render a loading spinner at first', () => {
    const wrapper = mount(<Provider store={store}><ConnectedList /></Provider>)
    const htmlstring = wrapper.html()
    expect(htmlstring).toContain('spinner-border')
  })

  it('should render an error if list is not an array', () => {
    store = setupStore(undefined, { repoList: { list: undefined } })
    const wrapper = mount(<Provider store={store}><ConnectedList /></Provider>)
    const htmlstring = wrapper.html()
    expect(htmlstring).not.toContain('spinner-border')
  })

  it('should render a list after it fetches', async () => {
    fetch.mockResponseOnce(JSON.stringify(
      [
        { name: 'fsa' }, { name: 'sads' }, { name: 'qqqq' },
      ],
    ))

    const wrapper = mount(<Provider store={store}><ConnectedList /></Provider>)
    await flushAllPromises()
    wrapper.update()
    expect(wrapper.find('div').children().length).toEqual(3)
  })
})
