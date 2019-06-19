/* global expect it describe fetch beforeEach */
import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
// eslint-disable-next-line
import { mount, shallow } from 'enzyme'

import { flushAllPromises } from '../../utilities'
import ConnectedRepo from './index'
import { REPO_COMPONENT_CLASS_NAME, REPORT_NOT_FETCHED_YET, REPORT_EXIST, REPORT_NOT_EXIST } from '../../constants'
import { setupStore } from '../../setupStore'


describe('Repo component', () => {
  let store
  const someRepoName = 'somereponame'
  const ownProps = { match: { params: { name: someRepoName } } }

  beforeEach(() => {
    // need to explicitly say repo: {} here for initial state
    // because for some reason multiple tests cause the store
    // to retain properties from previous tests
    store = setupStore(undefined, { repo: {}, reports: { [someRepoName]: { latest: { reportStatus: REPORT_EXIST } } } })
    fetch.mock.calls = []
    fetch.mock.instances = []
    fetch.mock.invocationCallOrder = []
    fetch.mock.results = []
  })

  it('should render', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <ConnectedRepo {...ownProps} />
        </Router>
      </Provider>,
    )
    const divElm = wrapper.find(`.${REPO_COMPONENT_CLASS_NAME}`)
    expect(divElm.exists()).toBeTruthy()
  })

  it('should have the jumbotron have padding-top be 0', () => {
    const store2 = setupStore(undefined, { repo: { name: someRepoName, license: null }, reports: { [someRepoName]: { latest: { reportStatus: REPORT_NOT_EXIST } } } })
    const wrapper = mount(
      <Provider store={store2}>
        <Router>
          <ConnectedRepo {...ownProps} />
        </Router>
      </Provider>,
    )
    const jumbotron = wrapper.find('.jumbotron')
    expect(jumbotron.props().style.paddingTop).toBe(0)
  })

  it('should fetch if store does not have repo data', async () => {
    mount(
      <Provider store={store}>
        <Router>
          <ConnectedRepo {...ownProps} />
        </Router>
      </Provider>,
    )
    await flushAllPromises()
    expect(fetch.mock.calls.length).toBe(1)
  })

  it('should NOT fetch if store does have repo data and report', async () => {
    const store2 = setupStore(
      undefined,
      {
        repo: { name: someRepoName, license: null },
        reports: { [someRepoName]: { latest: { reportStatus: REPORT_EXIST, data: { badges: [], build_number: 1, current_commit: 'dsa' } } } },
      },
    )

    mount(
      <Provider store={store2}>
        <Router>
          <ConnectedRepo {...ownProps} />
        </Router>
      </Provider>,
    )
    await flushAllPromises()
    expect(fetch.mock.calls.length).toBe(0)
  })

  it('should fetch if store does not have report', async () => {
    const store2 = setupStore(undefined, { repo: { name: someRepoName, license: null }, reports: { [someRepoName]: { latest: { reportStatus: REPORT_NOT_FETCHED_YET } } } })

    mount(
      <Provider store={store2}>
        <Router>
          <ConnectedRepo {...ownProps} />
        </Router>
      </Provider>,
    )
    await flushAllPromises()
    expect(fetch.mock.calls[0][0]).toBe(`https://staging-projects.nikitas.link/reports/${someRepoName}/latest.json`)
  })

  it('should only fetch repo data if the store already has a report', async () => {
    const store2 = setupStore(undefined, { repo: { }, reports: { [someRepoName]: { latest: { reportStatus: REPORT_EXIST }}} })

    mount(
      <Provider store={store2}>
        <Router>
          <ConnectedRepo {...ownProps} />
        </Router>
      </Provider>,
    )
    await flushAllPromises()
    expect(fetch.mock.calls[0][0]).not.toBe(`https://staging-projects.nikitas.link/reports/${someRepoName}/latest.json`)
  })

  it('should render the name, and description of the repo', () => {
    const store2 = setupStore(undefined, { repo: { name: someRepoName, description: 'test', license: null }, reports: { [someRepoName]: { latest: { reportStatus: REPORT_NOT_EXIST } } } })
    const wrapper = mount(
      <Provider store={store2}>
        <Router>
          <ConnectedRepo {...ownProps} />
        </Router>
      </Provider>,
    )

    const html = wrapper.html()
    // the arrows represent the closing and opening tags that surround the text
    expect(html).toMatch(`>${someRepoName}<`)
    expect(html).toMatch('>"test"<')
  })
})
