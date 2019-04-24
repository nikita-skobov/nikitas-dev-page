import { NAVLINK_CLICK_REPO } from '../constants'

export function clickRepo(item) {
  return {
    type: NAVLINK_CLICK_REPO,
    payload: {
      item,
    },
  }
}
