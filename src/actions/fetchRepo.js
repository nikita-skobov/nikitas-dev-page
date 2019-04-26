/* global fetch */

import {
  FETCH_REPO_BEGIN,
  FETCH_REPO_SUCCESS,
  FETCH_REPO_FAILURE,
} from '../constants'
import { handleErrors } from '../utilities'


export function fetchRepoBegin() {
  return {
    type: FETCH_REPO_BEGIN,
  }
}

export function fetchRepoSuccess(body) {
  return {
    type: FETCH_REPO_SUCCESS,
    payload: {
      body,
    },
  }
}

export function fetchRepoFailure(err) {
  return {
    type: FETCH_REPO_FAILURE,
    payload: {
      err,
    },
  }
}


export function fetchRepo(name) {
  return (dispatch) => {
    dispatch(fetchRepoBegin())
    return fetch(`https://api.github.com/repos/nikita-skobov/${name}`)
      .then(handleErrors)
      .then(resp => resp.json())
      .then(data => dispatch(fetchRepoSuccess(data)))
      .catch(err => dispatch(fetchRepoFailure(err)))
  }
}
