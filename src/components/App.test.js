/* global expect it describe beforeEach fetch */

import * as React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'

import { setupStore } from '../setupStore'
import ConnectedApp from './App'

describe('The Application', () => {
  // eslint-disable-next-line
  const delayTime = timeInSeconds => new Promise(res => setTimeout(res, timeInSeconds * 1000))
  const flushAllPromises = () => new Promise(res => setImmediate(res))

  let store

  beforeEach(() => {
    store = setupStore()
    fetch.resetMocks()
  })

  it('empty test', () => {
    expect(1).toEqual(1)
  })

  // it('should not have h1 text as soon as the app starts', () => {
  //   const wrapper = mount(<Provider store={store}><ConnectedApp /></Provider>)
  //   const h1Element = wrapper.find('h1')
  //   expect(h1Element.exists()).toBe(true)
  //   expect(h1Element.html()).toBe('<h1></h1>')
  // })

  // it('should have text inside after clicking the button', async () => {
  //   fetch.mockResponseOnce(JSON.stringify({ title: 'delectus aut autem' }))

  //   const wrapper = mount(<Provider store={store}><ConnectedApp /></Provider>)
  //   const h1Element = wrapper.find('h1')
  //   wrapper.find('#test-button').simulate('click')
  //   await flushAllPromises()
  //   wrapper.update()
  //   expect(h1Element.html()).toBe('<h1>delectus aut autem</h1>')
  // })
})
