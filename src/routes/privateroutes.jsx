import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router";

import LocalStorage from "../utils/LocalStorage"

const useAuth = () => {
  const token = LocalStorage.getAccessToken();
  const user = LocalStorage.getUser();

  if (user && token) {
    return {
      auth: true     
    };
  } else {
    return {
      auth: false      
    };
  }
};

const PrivateRoute = (props) => {
    const { auth, role } = useAuth();
    const location = useLocation();
    return auth ? ( <Outlet />) : ( <Navigate replace to="/login" state={{ from: location }} />);
}

export default PrivateRoute;