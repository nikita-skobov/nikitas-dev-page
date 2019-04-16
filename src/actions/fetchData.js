/* global fetch */

import {
  FETCH_REQUEST_START,
  FETCH_REQUEST_SUCCESS,
  FETCH_REQUEST_FAILURE,
} from '../constants'

export function fetchRequest() {
  return {
    type: FETCH_REQUEST_START,
  }
}

export function fetchRequestSuccess(body) {
  return {
    type: FETCH_REQUEST_SUCCESS,
    payload: {
      url: body.title,
    },
  }
}

export function fetchRequestFailure(err) {
  return {
    type: FETCH_REQUEST_FAILURE,
    err,
  }
}

export function fetchSpecific() {
  return (dispatch) => {
    dispatch(fetchRequest())
    return fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(resp => resp.json())
      .then(data => dispatch(fetchRequestSuccess(data)))
      .catch(err => dispatch(fetchRequestFailure(err)))
  }
}


export class FetchData {
  constructor(name) {
    this.TYPE_BEGIN = FETCH_REQUEST_START
    this.TYPE_FAIL = FETCH_REQUEST_FAILURE
    this.TYPE_SUCCESS = FETCH_REQUEST_SUCCESS
    this.name = name || 'ORIGINAL'

    this.handleErrors = (response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    }
  }

  fetchBegin() {
    return {
      type: `${this.TYPE_BEGIN}_${this.name}`,
    }
  }

  fetchFailure(err) {
    return {
      type: `${this.TYPE_FAIL}_${this.name}`,
      payload: {
        err,
      },
    }
  }

  fetchSuccess(body) {
    return {
      type: `${this.TYPE_SUCCESS}_${this.name}`,
      payload: {
        body,
      },
    }
  }
}
