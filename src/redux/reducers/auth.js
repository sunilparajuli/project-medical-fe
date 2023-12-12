import * as AuthTypes from "../types/auth";

const initialSatet ={
    authenticated: false,
    token:"",
    accessToken: "",
    loading : false,
    authData: null,
    successMessage  : null,
    errorMessage : null
    
}
export default function authReducer(state = initialSatet, action ) {
    switch (action.type) {
        
        case AuthTypes.LOADING_AUTHENTICATION:
            return { ...state, loading: true, successMessage :null, errorMessage: null };
        case AuthTypes.SET_AUTHENTICATED:
            return {
                ...state,
                authData: action.payload,
                loading : false,
                successMessage : action.payload,
                authenticated: true,
              };
        case AuthTypes.SET_UNAUTHENTICATED:
            console.log("pauyload", action)
            return {
                ...state,
                authData:null ,
                errorMessage : action.payload,
                authenticated: false,                
              };  
        case AuthTypes.LOADING_AUTHENTICATION_FAILED:
            console.log("payload", action)
            return {
                ...state,
                errorMessage : action.payload,
                loading: false,
              };
        default:
            return state;
    }
}