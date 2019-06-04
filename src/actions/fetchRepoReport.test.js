/* global expect it describe fetch afterEach beforeEach */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as fetchReport from './fetchRepoReport'
import { flushAllPromises } from '../utilities'
import {
  FETCH_REPORT_BEGIN,
  FETCH_REPORT_SUCCESS,
  FETCH_REPORT_FAILURE,
} from '../constants'

describe('fetch report begin function', () => {
  it('should return type: FETCH_REPORT_BEGIN', () => {
    expect(fetchReport.fetchReportBegin()).toEqual(expect.objectContaining({
      type: FETCH_REPORT_BEGIN,
    }))
  })
})

describe('fetch report success function', () => {
  it('should return type: FETCH_REPORT_SUCCESS', () => {
    expect(fetchReport.fetchReportSuccess()).toEqual(expect.objectContaining({
      type: FETCH_REPORT_SUCCESS,
    }))
  })

  it('should include a payload.body property with the passed in value', () => {
    const someValue = 5
    expect(fetchReport.fetchReportSuccess(someValue)).toEqual(expect.objectContaining({
      payload: {
        body: someValue,
      },
    }))
  })
})

describe('fetch report failure function', () => {
  it('should return type: FETCH_REPORT_FAILURE', () => {
    expect(fetchReport.fetchReportFailure()).toEqual(expect.objectContaining({
      type: FETCH_REPORT_FAILURE,
    }))
  })

  it('should include a payload.err property with the passed in value', () => {
    const someValue = 7
    expect(fetchReport.fetchReportFailure(someValue)).toEqual(expect.objectContaining({
      payload: {
        err: someValue,
      },
    }))
  })
})

describe('fetch repo list function', () => {
  let store

  beforeEach(() => {
    jest.resetModules()
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    store = mockStore({})
  })

  afterEach(() => {
    fetch.resetMocks()
  })

  it('should fetch from the staging domain while testing', () => {
    fetch.mockResponseOnce(JSON.stringify(
      {
        badges: [],
      },
    ))

    fetchReport.fetchReport('reponame')(() => {})
    expect(fetch.mock.calls[0][0]).toEqual('https://staging-projects.nikitas.link/reports/reponame/latest.json')
  })

  it('should fetch from the production domain if in production', () => {
    process.env.NODE_ENV = 'production'

    // eslint-disable-next-line
    const thisModule = require('./fetchRepoReport')

    fetch.mockResponseOnce(JSON.stringify(
      {
        badges: [],
      },
    ))

    thisModule.fetchReport('reponame')(() => {})

    expect(fetch.mock.calls[0][0]).toEqual('https://projects.nikitas.link/reports/reponame/latest.json')
  })

  it('should dispatch FETCH_REPORT_BEGIN and FETCH_REPORT_SUCCESS if fetch is successful', async () => {
    const body = { some: 'data' }
    fetch.mockResponseOnce(JSON.stringify(body))

    fetchReport.fetchReport('reponame')(store.dispatch)

    await flushAllPromises()
    expect(store.getActions()).toEqual(
      [
        { type: FETCH_REPORT_BEGIN },
        {
          type: FETCH_REPORT_SUCCESS,
          payload: {
            body,
          },
        },
      ],
    )
  })

  it('should dispatch FETCH_REPORT_BEGIN and FETCH_REPORT_FAILURE if fetch results in an error', async () => {
    const body = { some: 'data' }
    fetch.mockResponseOnce(JSON.stringify(body), { status: 404, statusText: 'oops' })

    fetchReport.fetchReport('somereponame')(store.dispatch)

    await flushAllPromises()
    expect(store.getActions()).toEqual(
      [
        { type: FETCH_REPORT_BEGIN },
        {
          type: FETCH_REPORT_FAILURE,
          payload: {
            err: new Error('oops'),
          },
        },
      ],
    )
  })
})
