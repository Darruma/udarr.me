import { combineReducers } from 'redux'
import terminalReducer from './terminalReducer'
import projectReducer from './projectReducer'
export default combineReducers({
    terminalReducer,
    projectReducer
})