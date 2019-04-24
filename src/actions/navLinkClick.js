import { NAVLINK_CLICK_REPO } from '../constants'

export function clickRepo(repoName, url) {
  return {
    type: NAVLINK_CLICK_REPO,
    payload: {
      repoName,
      url,
    },
  }
}
