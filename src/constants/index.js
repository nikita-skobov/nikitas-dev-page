/* global window */
const { hostname } = window.location
const { NODE_ENV } = process.env

export const FETCH_REPO_LIST_BEGIN = 'FETCH_REPO_LIST_BEGIN'
export const FETCH_REPO_LIST_SUCCESS = 'FETCH_REPO_LIST_SUCCESS'
export const FETCH_REPO_LIST_FAILURE = 'FETCH_REPO_LIST_FAILURE'
export const FETCH_REPO_BEGIN = 'FETCH_REPO_BEGIN'
export const FETCH_REPO_SUCCESS = 'FETCH_REPO_SUCCESS'
export const FETCH_REPO_FAILURE = 'FETCH_REPO_FAILURE'
export const NAVLINK_CLICK_REPO = 'NAVLINK_CLICK_REPO'
export const FETCH_REPORT_BEGIN = 'FETCH_REPORT_BEGIN'
export const FETCH_REPORT_SUCCESS = 'FETCH_REPORT_SUCCESS'
export const FETCH_REPORT_FAILURE = 'FETCH_REPORT_FAILURE'

export const REPORT_NOT_EXIST = 1
export const REPORT_NOT_FETCHED_YET = 2
export const REPORT_EXIST = 3

export const REPORT_LIST_COMPONENT_CLASS_NAME = 'ns-report-list'
export const REPORT_ITEM_COMPONENT_CLASS_NAME = 'ns-report-item'
export const LIST_COMPONENT_CLASS_NAME = 'ns-list'
export const LIST_ITEM_COMPONENT_CLASS_NAME = 'ns-list-item'
export const REPO_COMPONENT_CLASS_NAME = 'ns-repo'
export const BADGE_COMPONENT_CLASS_NAME = 'ns-badge'
export const GROUP_SPACER_COMPONENT_CLASS_NAME = 'ns-group-spacer'
export const DETAIL_TABLE_COMPONENT_CLASS_NAME = 'ns-detail-table'
export const DETAIL_TABLE_ENTRY_COMPONENT_CLASS_NAME = 'ns-detail-table-entry'
export const PAGE_LIST_COMPONENT_CLASS_NAME = 'ns-page-list'
export const NAVBAR_COMPONENT_CLASS_NAME = 'ns-nav-bar'

export const REPO_PATH_PREFIX = 'repos'
export const SITE_NAME = 'Sample Dev Site'

let apiDomain = ''
if (NODE_ENV === 'production' && hostname === 'staging-projects.nikitas.link') {
  // staging live domain
  apiDomain = 'staging-projects.nikitas.link'
} else if (NODE_ENV === 'production') {
  // production live domain
  apiDomain = 'projects.nikitas.link'
} else {
  // localhost test
  apiDomain = 'staging-projects.nikitas.link'
}


export const SITE_DOMAIN = apiDomain
