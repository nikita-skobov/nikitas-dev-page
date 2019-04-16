import {
  FETCH_REPO_LIST_SUCCESS,
  FETCH_REPO_LIST_FAILURE,
} from '../../constants'

export const initialState = {
  list: [],
}

export function repoListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_REPO_LIST_SUCCESS: {
      return {
        ...state,
        list: action.payload.body,
      }
    }
    case FETCH_REPO_LIST_FAILURE: {
      return {
        ...state,
        list: undefined,
      }
    }
    default:
      return state
  }
}
