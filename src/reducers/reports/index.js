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
          retObj[obj.name] = {
            latest: {
              reportStatus: REPORT_NOT_FETCHED_YET,
            },
          }
        }
      })

      return retObj
    }

    case FETCH_REPO_SUCCESS: {
      const retObj = { ...state }
      const { body } = action.payload
      if (!has.call(retObj, body.name)) {
        retObj[body.name] = {
          latest: {
            reportStatus: REPORT_NOT_FETCHED_YET,
          },
        }
      }

      return retObj
    }

    case FETCH_REPORT_SUCCESS: {
      const { repoName, body, fetchedKey } = action.payload
      const retObj = { ...state }
      const buildNumber = parseInt(body.build_number, 10)

      if (has.call(retObj, repoName)) {
        retObj[repoName][buildNumber] = {
          reportStatus: REPORT_EXIST,
          data: { ...body },
        }
      } else {
        retObj[repoName] = {
          [buildNumber]: {
            reportStatus: REPORT_EXIST,
            data: { ...body },
          },
        }
      }

      if (fetchedKey === 'latest.json') {
        retObj[repoName].latest = {
          reportStatus: REPORT_EXIST,
          data: { ...body },
        }
      }

      return retObj
    }

    case FETCH_REPORT_FAILURE: {
      const { repoName, fetchedKey } = action.payload
      const retObj = { ...state }

      if (fetchedKey === 'latest.json') {
        retObj[repoName].latest = {
          reportStatus: REPORT_NOT_EXIST,
        }
      } else {
        const buildNumberString = fetchedKey.split('_')[1].split('.')[0]
        const buildNumber = parseInt(buildNumberString, 10)

        if (has.call(retObj[repoName], buildNumber)) {
          retObj[repoName][buildNumber].reportStatus = REPORT_NOT_EXIST
        } else {
          retObj[repoName][buildNumber] = {
            reportStatus: REPORT_NOT_EXIST,
          }
        }
      }

      return retObj
    }

    default:
      return state
  }
}
