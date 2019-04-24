import { combineReducers } from 'redux'
import { repoListReducer } from './repoList'
import { repoReducer } from './repo'


export default combineReducers({
  repoList: repoListReducer,
  repo: repoReducer,
})
