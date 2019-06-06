import { has } from '../../utilities'
import { FETCH_REPORT_SUCCESS, FETCH_REPO_SUCCESS, FETCH_REPO_LIST_SUCCESS } from '../../constants'

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
          retObj[obj.name] = { hasReport: false }
        }
      })
      return retObj
    }
    case FETCH_REPO_SUCCESS: {
      const retObj = { ...state }
      const { body } = action.payload
      if (!has.call(retObj, body.name)) {
        retObj[body.name] = { hasReport: false }
      }
      return retObj
    }
    case FETCH_REPORT_SUCCESS: {
      const { repoName, body } = action.payload
      const retObj = { ...state }
      if (has.call(retObj, repoName)) {
        retObj[repoName].hasReport = true
        retObj[repoName].reportData = { ...body }
      } else {
        retObj[repoName] = { hasReport: true, reportData: { ...body } }
      }

      return retObj
    }
    default:
      return state
  }
}
