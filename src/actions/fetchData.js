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
