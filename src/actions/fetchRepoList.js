/* global fetch */

import {
  FETCH_REPO_LIST_BEGIN,
  FETCH_REPO_LIST_SUCCESS,
  FETCH_REPO_LIST_FAILURE,
} from '../constants'


export function fetchRepoListBegin() {
  return {
    type: FETCH_REPO_LIST_BEGIN,
  }
}

export function fetchRepoListSuccess(body) {
  return {
    type: FETCH_REPO_LIST_SUCCESS,
    payload: {
      body,
    },
  }
}

export function fetchRepoListFailure(err) {
  return {
    type: FETCH_REPO_LIST_FAILURE,
    payload: {
      err,
    },
  }
}

export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}


export function fetchRepoList() {
  return (dispatch) => {
    dispatch(fetchRepoListBegin())
    return fetch('https://api.github.com/users/nikita-skobov/repos')
      .then(handleErrors)
      .then(resp => resp.json())
      .then(data => dispatch(fetchRepoListSuccess(data)))
      .catch(err => dispatch(fetchRepoListFailure(err)))
  }
}
