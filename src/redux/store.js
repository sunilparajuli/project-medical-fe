import { combineReducers} from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer  from './reducers/auth';

const preloadedState = {};
const middleware = [thunk];


const reducer = combineReducers({
    auth: authReducer
})

const store= configureStore({
    reducer,
    preloadedState,
    middleware
})

export default store