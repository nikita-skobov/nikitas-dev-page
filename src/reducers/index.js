import { combineReducers } from 'redux'
import { repoListReducer } from './repoList'
import { repoReducer } from './repo'
import { reportReducer } from './reports'


export default combineReducers({
  repoList: repoListReducer,
  repo: repoReducer,
  reports: reportReducer,
})
