// ====================================================
// Imports
// Main
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import appReducer from './reducers/appReducer'
import dataReducer from './reducers/dataReducer'

// ====================================================
// CombineReducers

let reducers = combineReducers({
	app: appReducer,
	data: dataReducer,
})

// ====================================================
// Store

let store = createStore(
	reducers,
	compose(
		applyMiddleware(thunk)
	)
)

// ====================================================
// Exports

export default store
