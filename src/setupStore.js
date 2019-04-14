import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/index'

export function setupStore(allEnhancers = applyMiddleware(thunk), initialState) {
  return createStore(reducers, { ...initialState }, allEnhancers)
}

export function createEnhancers(middlewareArray) {
  return compose(
    applyMiddleware(...middlewareArray),
    // eslint-disable-next-line
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),    
  )
}
