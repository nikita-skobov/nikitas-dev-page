/* global expect it describe beforeEach */

import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
// eslint-disable-next-line
import { mount, shallow } from 'enzyme'

import { setupStore } from '../setupStore'
import ConnectedApp from './App'

import {
  REPO_PATH_PREFIX,
  LIST_COMPONENT_CLASS_NAME,
  REPO_COMPONENT_CLASS_NAME,
} from '../constants'

describe('the application', () => {
  let store

  beforeEach(() => {
    store = setupStore()
  })

  it('should render', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedApp />
        </MemoryRouter>
      </Provider>,
    )
    expect(wrapper.find('div').exists()).toBeTruthy()
  })

  it('should render the List component if on the /repos path', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/${REPO_PATH_PREFIX}/`]}>
          <ConnectedApp />
        </MemoryRouter>
      </Provider>,
    )
    expect(wrapper.find(`.${REPO_COMPONENT_CLASS_NAME}`).exists()).toBe(false)
    expect(wrapper.find(`.${LIST_COMPONENT_CLASS_NAME}`).exists()).toBe(true)
  })

  it('should render the Repo component if on the /repos/<repo name> path', () => {
    const repoName = 'test'
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/${REPO_PATH_PREFIX}/${repoName}`]}>
          <ConnectedApp />
        </MemoryRouter>
      </Provider>,
    )
    expect(wrapper.find(`.${LIST_COMPONENT_CLASS_NAME}`).exists()).toBe(false)
    expect(wrapper.find(`.${REPO_COMPONENT_CLASS_NAME}`).exists()).toBe(true)
  })
})
