import axios from "axios";
import {useStateContext} from "./context/ContextProvider.jsx";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  timeout : 5000
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`
  return config;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const {response} = error;
  if (response.status === 401) {
    //const refresh_token = localStorage.getItem('refresh_token'); todo - refresh token
    localStorage.removeItem('ACCESS_TOKEN')
    return;
    const refresh_token = localStorage.getItem('REFRESH_TOKEN');
    axiosClient.post('/api/users/token/refresh/', {refresh: refresh_token})
    .then((response) => {
        localStorage.setItem('ACCESS_TOKEN', response.data.access);
        axiosClient.defaults.headers['Authorization'] = "Bearer " + response.data.access;
        return axiosClient(originalRequest);
    })
    .catch(err => {
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('REFRESH_TOKEN');
        console.log(err)
    });
    // window.location.reload();
  } else if (response.status === 404) {
    //Show not found
  }

  throw error;

})

export default axiosClient
