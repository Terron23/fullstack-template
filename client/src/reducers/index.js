import {combineReducers} from 'redux';
import authReducers from './authReducers.js'




export default combineReducers({
    auth: authReducers
})
