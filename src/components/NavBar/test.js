/* global expect it describe fetch beforeEach */
import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
// eslint-disable-next-line
import { mount, shallow } from 'enzyme'

import { capitalize } from '../../utilities'
import { setupStore } from '../../setupStore'
import ConnectedNavbar from './index'
import { NAVBAR_COMPONENT_CLASS_NAME, REPO_PATH_PREFIX, SITE_NAME } from '../../constants'

describe('the navbar component', () => {
  let store

  beforeEach(() => {
    store = setupStore()
  })

  it('should render', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <ConnectedNavbar />
        </Router>
      </Provider>,
    )

    const divElm = wrapper.find(`.${NAVBAR_COMPONENT_CLASS_NAME}`)
    expect(divElm.exists()).toBeTruthy()
  })

  it('should have the title be within a navlink to the root directory', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <ConnectedNavbar />
        </Router>
      </Provider>,
    )

    const navlink = wrapper.find('a[href="/"]')
    expect(navlink.childAt(0).text()).toBe(SITE_NAME)
  })

  it('should have a repo nav item within a navlink to the /repos directory', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <ConnectedNavbar />
        </Router>
      </Provider>,
    )

    const navlink = wrapper.find(`a[href="/${REPO_PATH_PREFIX}/"]`)
    expect(navlink.childAt(0).text()).toBe(capitalize(REPO_PATH_PREFIX))
  })
})
