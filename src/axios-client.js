import axios from "axios";
import {useStateContext} from "./context/ContextProvider.jsx";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  timeout : 5000
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `${token}`
  return config;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const {response} = error;
  if (response.status === 401) {
    //const refresh_token = localStorage.getItem('refresh_token'); todo - refresh token
    localStorage.removeItem('ACCESS_TOKEN')
    
    // window.location.reload();
  } else if (response.status === 404) {
    //Show not found
  }

  throw error;

})

export default axiosClient
