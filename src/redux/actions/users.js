import axiosClient from "../../axios-client.js";
// import * as AuthTypes from "../types/auth.js"
//import { useStateContext } from "../../context/ContextProvider.jsx";
import LocalStorage from "../../utils/LocalStorage.jsx";


export const fetchUsers = (payload) => {
    // debugger
    var page =2;
    return (dispatch) => {
        dispatch({ type: "USERS_REQ" });
        axiosClient.get('/api/emr-users/', {params :{payload}})
            .then(({ data }) => {
                dispatch({
                    type: "USERS_RESP",
                    payload: data,
                });

                // LocalStorage.saveAccessToken(data.access_token)
                // LocalStorage.saveRefreshToken(data.refresh_token)
                // LocalStorage.saveUser(data.username)
            })
            .catch((err) => {            
                dispatch({ type: "USERS_ERR", payload : data });                
            })
    }
}

// export const logOut= (payload) => {

//     return (dispatch) => {       
//         axiosClient.post('/api/users/logout', payload)
//             .then(({ data }) => {
//                 dispatch({
//                     type: AuthTypes.SET_UNAUTHENTICATED,                    
//                 });
//                 LocalStorage.clearContext()             
//             })
//             .catch((err) => {                                  
//             })
//     }
// }