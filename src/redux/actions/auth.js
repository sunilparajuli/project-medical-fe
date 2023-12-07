import axiosClient from "../../axios-client.js";
import * as AuthTypes from "../types/auth"
//import { useStateContext } from "../../context/ContextProvider.jsx";
import LocalStorage from "../../utils/LocalStorage.jsx";


export const logIn = (payload) => {
    return (dispatch) => {
        dispatch({ type: AuthTypes.LOADING_AUTHENTICATION });
        axiosClient.post('/api/users/token/', payload)
            .then(({ data }) => {
                dispatch({
                    type: AuthTypes.SET_AUTHENTICATED,
                    payload: data,
                });

                LocalStorage.saveAccessToken(data.access_token)
                LocalStorage.saveRefreshToken(data.refresh_token)
                LocalStorage.saveUser(data.username)
            })
            .catch((err) => {            
                dispatch({ type: AuthTypes.LOADING_AUTHENTICATION_FAILED });                
            })
    }
}

export const logOut= (payload) => {

    return (dispatch) => {       
        axiosClient.post('/api/users/logout', payload)
            .then(({ data }) => {
                dispatch({
                    type: AuthTypes.SET_UNAUTHENTICATED,                    
                });
                LocalStorage.clearContext()             
            })
            .catch((err) => {                                  
            })
    }
}