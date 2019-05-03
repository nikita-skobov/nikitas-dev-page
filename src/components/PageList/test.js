/* global expect it describe fetch beforeEach */
import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
// eslint-disable-next-line
import { mount, shallow } from 'enzyme'

import { setupStore } from '../../setupStore'
import ConnectedPageList from './index'
import { PAGE_LIST_COMPONENT_CLASS_NAME, REPO_PATH_PREFIX } from '../../constants'

describe('the page list component', () => {
  let store

  beforeEach(() => {
    store = setupStore()
    fetch.mock.calls = []
    fetch.mock.instances = []
    fetch.mock.invocationCallOrder = []
    fetch.mock.results = []
  })

  it('should render if not on the homepage', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <ConnectedPageList location={{ pathname: `/${REPO_PATH_PREFIX}` }} />
        </Router>
      </Provider>,
    )

    const divElm = wrapper.find(`.${PAGE_LIST_COMPONENT_CLASS_NAME}`)
    expect(divElm.exists()).toBeTruthy()
  })

  it('should NOT render if on the home page, ie root directory', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <ConnectedPageList location={{ pathname: '/' }} />
        </Router>
      </Provider>,
    )

    expect(wrapper.html()).toBeNull()
  })

  it('should have every breadcrumb within an <a> tag except the last one', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <ConnectedPageList location={{ pathname: `/${REPO_PATH_PREFIX}/somereponame` }} />
        </Router>
      </Provider>,
    )

    const breadCrumbs = wrapper.find('.breadcrumb')
    const numBreadCrumbs = breadCrumbs.children().length

    for (let i = 0; i < numBreadCrumbs - 1; i += 1) {
      expect(breadCrumbs.childAt(i).html()).toMatch('<a')
    }

    expect(breadCrumbs.childAt(numBreadCrumbs - 1).html()).not.toMatch('<a')
  })
})
