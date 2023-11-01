import {createContext, useContext, useState} from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setRefreshToken : () => {},
  setNotification: () => {},
  setErrorNotification: () => {},
})

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [refreshToken, _setRefreshToken] = useState(localStorage.getItem('REFRESH_TOKEN'));
  const [notification, _setNotification] = useState('');
  const [errornotification, _setErrorNotification] = useState('');

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  const setRefreshToken = (token) => {
    _setRefreshToken(token)
    if (token) {
      localStorage.setItem('REFRESH_TOKEN', token);
    } else {
      localStorage.removeItem('REFRESH_TOKEN');
    }
  }
  const setNotification = message => {
    _setNotification(message);

    // setTimeout(() => {
    //   _setNotification('')
    // }, 5000)
  }


  const setErrorNotification = message => {
    _setErrorNotification(message);

    // setTimeout(() => {
    //   _setErrorNotification('')
    // }, 5000)
  }
  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      setRefreshToken,
      notification,
      setNotification,
      errornotification,
      setErrorNotification
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
