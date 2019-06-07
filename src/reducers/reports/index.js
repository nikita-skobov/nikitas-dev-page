import { has } from '../../utilities'
import {
  FETCH_REPORT_SUCCESS,
  FETCH_REPO_SUCCESS,
  FETCH_REPO_LIST_SUCCESS,
  FETCH_REPORT_FAILURE,
  REPORT_EXIST,
  REPORT_NOT_EXIST,
  REPORT_NOT_FETCHED_YET,
} from '../../constants'

export const initialState = { }

export function reportReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_REPO_LIST_SUCCESS: {
      const retObj = { ...state }
      const { body } = action.payload
      body.forEach((obj) => {
        if (!has.call(retObj, obj.name)) {
          // the current state does not have this repo name,
          // so that means we havent fetched its report yet
          retObj[obj.name] = { reportStatus: REPORT_NOT_FETCHED_YET, reportData: [] }
        }
      })
      return retObj
    }

    case FETCH_REPO_SUCCESS: {
      const retObj = { ...state }
      const { body } = action.payload
      if (!has.call(retObj, body.name)) {
        retObj[body.name] = { reportStatus: REPORT_NOT_FETCHED_YET, reportData: [] }
      }
      return retObj
    }

    case FETCH_REPORT_SUCCESS: {
      const { repoName, body } = action.payload
      const retObj = { ...state }
      if (has.call(retObj, repoName)) {
        retObj[repoName].reportStatus = REPORT_EXIST
        retObj[repoName].reportData.push({ ...body })
      } else {
        retObj[repoName] = { reportStatus: REPORT_EXIST, reportData: [{ ...body }] }
      }

      return retObj
    }

    case FETCH_REPORT_FAILURE: {
      const { repoName } = action.payload
      const retObj = { ...state }
      if (has.call(retObj, repoName)) {
        retObj[repoName].reportStatus = REPORT_NOT_EXIST
      } else {
        retObj[repoName] = { reportStatus: REPORT_NOT_EXIST }
      }

      return retObj
    }

    default:
      return state
  }
}
