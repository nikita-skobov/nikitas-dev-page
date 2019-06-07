import { NAVLINK_CLICK_REPO } from '../constants'

export function clickRepo(item) {
  window.scrollTo(0, 0)

  return {
    type: NAVLINK_CLICK_REPO,
    payload: {
      item,
    },
  }
}
