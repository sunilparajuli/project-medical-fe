import { combineReducers} from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer  from './reducers/auth';
import userReducer from './reducers/users';

const preloadedState = {};
const middleware = [thunk];


const reducer = combineReducers({
    auth: authReducer,
    user : userReducer
})

const store= configureStore({
    reducer,
    preloadedState,
    middleware
})

export default store