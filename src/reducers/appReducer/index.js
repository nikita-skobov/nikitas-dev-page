import { FETCH_REQUEST_SUCCESS } from '../../constants'

export const initialState = {
  url: undefined,
}

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_REQUEST_SUCCESS: {
      return {
        ...state,
        url: action.payload.url,
      }
    }
    default:
      return state
  }
}
