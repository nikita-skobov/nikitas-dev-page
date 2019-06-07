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

export function fetchReportSuccess(body, repoName) {
  return {
    type: FETCH_REPORT_SUCCESS,
    payload: {
      body,
      repoName,
    },
  }
}

export function fetchReportFailure(err, repoName) {
  return {
    type: FETCH_REPORT_FAILURE,
    payload: {
      err,
      repoName,
    },
  }
}


export function fetchReport(name) {
  const repoName = name
  return (dispatch) => {
    dispatch(fetchReportBegin())
    return fetch(`https://${SITE_DOMAIN}/reports/${name}/latest.json`)
      .then(handleErrors)
      .then(resp => resp.json())
      .then(data => dispatch(fetchReportSuccess(data, repoName)))
      .catch(err => dispatch(fetchReportFailure(err, repoName)))
  }
}
