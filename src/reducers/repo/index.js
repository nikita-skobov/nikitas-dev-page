import { NAVLINK_CLICK_REPO, FETCH_REPO_SUCCESS, FETCH_REPORT_SUCCESS } from '../../constants'

export const initialState = { hasReport: false }

export function repoReducer(state = initialState, action) {
  switch (action.type) {
    case NAVLINK_CLICK_REPO: {
      return {
        ...state,
        ...action.payload.item,
      }
    }
    case FETCH_REPO_SUCCESS: {
      return {
        ...state,
        ...action.payload.body,
      }
    }
    case FETCH_REPORT_SUCCESS: {
      return {
        ...state,
        hasReport: true,
      }
    }
    default:
      return state
  }
}
