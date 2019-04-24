import { NAVLINK_CLICK_REPO } from '../../constants'

export const initialState = {
  name: '',
  url: '',
}

export function repoReducer(state = initialState, action) {
  switch (action.type) {
    case NAVLINK_CLICK_REPO: {
      return {
        ...state,
        name: action.payload.repoName,
        url: action.payload.url,
      }
    }
    default:
      return state
  }
}
