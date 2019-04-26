import { NAVLINK_CLICK_REPO, FETCH_REPO_SUCCESS } from '../../constants'

export const initialState = {}

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
    default:
      return state
  }
}
