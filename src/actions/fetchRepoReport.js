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

export function fetchReportSuccess(body) {
  return {
    type: FETCH_REPORT_SUCCESS,
    payload: {
      body,
    },
  }
}

export function fetchReportFailure(err) {
  return {
    type: FETCH_REPORT_FAILURE,
    payload: {
      err,
    },
  }
}


export function fetchReport(name) {
  return (dispatch) => {
    dispatch(fetchReportBegin())
    return fetch(`https://${SITE_DOMAIN}/reports/${name}/latest.json`)
      .then(handleErrors)
      .then(resp => resp.json())
      .then(data => dispatch(fetchReportSuccess(data)))
      .catch(err => dispatch(fetchReportFailure(err)))
  }
}
