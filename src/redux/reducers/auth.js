import * as AuthTypes from "../types/auth";

const initialSatet ={
    authenticated: false,
    token:"",
    accessToken: "",
    loading : false,
    authData: null,
    
}
export default function authReducer(state = initialSatet, action ) {
    switch (action.type) {
        case AuthTypes.LOADING_AUTHENTICATION:
            return { ...state, loading: true };
        case AuthTypes.SET_AUTHENTICATED:
            return {
                ...state,
                authData: action.payload,
                loading : false,
                authenticated: true,
              };
        case AuthTypes.SET_UNAUTHENTICATED:
            return {
                ...state,
                authData:null ,
                authenticated: false,                
              };  
        case AuthTypes.LOADING_AUTHENTICATION_FAILED:
            return {
                ...state,
                loading: false,
              };
        default:
            return state;
    }
}