import { combineReducers } from 'redux'
import { appReducer } from './appReducer'
import { repoListReducer } from './repoList'


export default combineReducers({
  app: appReducer,
  repoList: repoListReducer,
})
