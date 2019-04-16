import { combineReducers } from 'redux'
import { repoListReducer } from './repoList'


export default combineReducers({
  repoList: repoListReducer,
})
