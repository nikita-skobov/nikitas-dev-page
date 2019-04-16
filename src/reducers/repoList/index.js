import {
  FETCH_REPO_LIST_SUCCESS,
  FETCH_REPO_LIST_FAILURE,
} from '../../constants'

export const initialState = {
  list: [],
}

export function repoListReducer(state = initialState, action) {
  console.log(action.type)
  switch (action.type) {
    case FETCH_REPO_LIST_SUCCESS: {
      return {
        ...state,
        list: action.payload.body,
      }
    }
    case FETCH_REPO_LIST_FAILURE: {
      console.log('repo list failure')
      return {
        ...state,
        list: undefined,
      }
    }
    default:
      return state
  }
}
