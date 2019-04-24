import { NAVLINK_CLICK_REPO } from '../../constants'

export const initialState = {}

export function repoReducer(state = initialState, action) {
  switch (action.type) {
    case NAVLINK_CLICK_REPO: {
      return {
        ...state,
        ...action.payload.item,
      }
    }
    default:
      return state
  }
}
