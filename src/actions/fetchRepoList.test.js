/* global expect it describe jest fetch afterEach beforeEach */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as fetchRepo from './fetchRepoList'
import { flushAllPromises } from '../utilities'
import {
  FETCH_REPO_LIST_BEGIN,
  FETCH_REPO_LIST_SUCCESS,
  FETCH_REPO_LIST_FAILURE,
} from '../constants'

describe('fetch repo list begin function', () => {
  it('should return type: FETCH_REPO_LIST_BEGIN', () => {
    expect(fetchRepo.fetchRepoListBegin()).toEqual(expect.objectContaining({
      type: FETCH_REPO_LIST_BEGIN,
    }))
  })
})

describe('fetch repo list success function', () => {
  it('should return type: FETCH_REPO_LIST_SUCCESS', () => {
    expect(fetchRepo.fetchRepoListSuccess()).toEqual(expect.objectContaining({
      type: FETCH_REPO_LIST_SUCCESS,
    }))
  })

  it('should include a payload.body property with the passed in value', () => {
    const someValue = 5
    expect(fetchRepo.fetchRepoListSuccess(someValue)).toEqual(expect.objectContaining({
      payload: {
        body: someValue,
      },
    }))
  })
})

describe('fetch repo list failure function', () => {
  it('should return type: FETCH_REPO_LIST_FAILURE', () => {
    expect(fetchRepo.fetchRepoListFailure()).toEqual(expect.objectContaining({
      type: FETCH_REPO_LIST_FAILURE,
    }))
  })

  it('should include a payload.err property with the passed in value', () => {
    const someValue = 7
    expect(fetchRepo.fetchRepoListFailure(someValue)).toEqual(expect.objectContaining({
      payload: {
        err: someValue,
      },
    }))
  })
})

describe('fetch repo list function', () => {
  let store

  beforeEach(() => {
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    store = mockStore({})
  })

  afterEach(() => {
    fetch.resetMocks()
  })

  it('should fetch from my github account', () => {
    fetch.mockResponseOnce(JSON.stringify(
      {
        some: 'data',
      },
    ))

    fetchRepo.fetchRepoList()(() => {})
    expect(fetch.mock.calls[0][0]).toEqual('https://api.github.com/users/nikita-skobov/repos')
  })

  it('should dispatch FETCH_REPO_LIST_BEGIN and FETCH_REPO_LIST_SUCCESS if fetch is successful', async () => {
    const body = { some: 'data' }
    fetch.mockResponseOnce(JSON.stringify(body))

    fetchRepo.fetchRepoList()(store.dispatch)

    await flushAllPromises()
    expect(store.getActions()).toEqual(
      [
        { type: FETCH_REPO_LIST_BEGIN },
        {
          type: FETCH_REPO_LIST_SUCCESS,
          payload: {
            body,
          },
        },
      ],
    )
  })

  it('should dispatch FETCH_REPO_LIST_BEGIN and FETCH_REPO_LIST_FAILURE if fetch results in an error', async () => {
    const body = { some: 'data' }
    fetch.mockResponseOnce(JSON.stringify(body), { status: 404, statusText: 'oops' })

    fetchRepo.fetchRepoList()(store.dispatch)

    await flushAllPromises()
    expect(store.getActions()).toEqual(
      [
        { type: FETCH_REPO_LIST_BEGIN },
        {
          type: FETCH_REPO_LIST_FAILURE,
          payload: {
            err: new Error('oops'),
          },
        },
      ],
    )
  })
})
