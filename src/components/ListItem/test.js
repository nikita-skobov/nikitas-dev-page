/* global expect describe it beforeEach jest */
import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
// eslint-disable-next-line
import { mount } from 'enzyme'

import { NAVLINK_CLICK_REPO, REPO_PATH_PREFIX } from '../../constants'
import * as repoReducers from '../../reducers/repo'
import ConnectedListItem, { ListItem } from './index'
import { setupStore } from '../../setupStore'

describe('ListItem component', () => {
  it('should render', () => {
    const wrapper = mount(<Router><ListItem item={{ name: 'dsa' }} /></Router>)
    expect(wrapper.find('.list-item').exists()).toBeTruthy()
  })

  it('should have a navlink to the repository component', () => {
    const repoName = 'some-repo-name'
    const item = {
      name: repoName,
      html_url: 'https://someurl.com',
    }
    const wrapper = mount(
      <Router>
        <ListItem item={item} />
      </Router>,
    )
    expect(wrapper.html()).toMatch(`href="/${REPO_PATH_PREFIX}/${repoName}">`)
  })

  describe('when clicking on a navlink', () => {
    let store
    repoReducers.repoReducer = jest.fn(repoReducers.repoReducer)

    beforeEach(() => {
      // so that we can test if the reducer functions have been called
      store = setupStore(undefined, undefined, repoReducers.repoReducer)
    })

    it('should cause a navLinkClick action to be dispatched', () => {
      const wrapper = mount(<Provider store={store}><Router><ConnectedListItem item={{ name: 'dsadsa' }} /></Router></Provider>)
      const stateChangeListener = jest.fn()
      store.subscribe(stateChangeListener)

      wrapper.find(`a[href="/${REPO_PATH_PREFIX}/dsadsa"]`).simulate('click')

      // the action should be dispatched
      expect(stateChangeListener).toHaveBeenCalledTimes(1)

      // the reducer function should receive the action
      // the first call is redux init,
      // the second call is receiving the action that was dispatched from
      // the navlink click. the second call has 2 arguments: current state,
      // and action. The current state should be an empty object, and the
      // action should be an object that contains the type: NAVLINK_CLICK_REPO
      expect(repoReducers.repoReducer).toHaveBeenNthCalledWith(2, {}, expect.objectContaining({
        type: NAVLINK_CLICK_REPO,
      }))
    })
  })
})
