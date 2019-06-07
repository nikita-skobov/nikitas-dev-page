/* global fetch */

import {
  FETCH_REPORT_BEGIN,
  FETCH_REPORT_SUCCESS,
  FETCH_REPORT_FAILURE,
  SITE_DOMAIN,
} from '../constants'
import { handleErrors } from '../utilities'


export function fetchReportBegin() {
  return {
    type: FETCH_REPORT_BEGIN,
  }
}

export function fetchReportSuccess(body, repoName, fetchedKey) {
  return {
    type: FETCH_REPORT_SUCCESS,
    payload: {
      body,
      repoName,
      fetchedKey,
    },
  }
}

export function fetchReportFailure(err, repoName, fetchedKey) {
  return {
    type: FETCH_REPORT_FAILURE,
    payload: {
      err,
      repoName,
      fetchedKey,
    },
  }
}


export function fetchReport(name, key = 'latest.json') {
  const repoName = name
  const fetchedKey = key
  return (dispatch) => {
    dispatch(fetchReportBegin())
    return fetch(`https://${SITE_DOMAIN}/reports/${name}/${key}`)
      .then(handleErrors)
      .then(resp => resp.json())
      .then(data => dispatch(fetchReportSuccess(data, repoName, fetchedKey)))
      .catch(err => dispatch(fetchReportFailure(err, repoName, fetchedKey)))
  }
}
