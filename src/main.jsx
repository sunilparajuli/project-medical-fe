import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from './Dashboard.jsx'
// import './index.css'
import {RouterProvider, Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
//import router from "./router.jsx";
import routes from "./routes/router"

import {ContextProvider} from './context/ContextProvider.jsx'

import { Provider } from "react-redux";
import store from './redux/store.js'
import PrivateRoute from './routes/privateroutes';

import Login  from './views/Login.jsx';
import DefaultLayout  from './components/DefaultLayout'

/* ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ContextProvider>
  </React.StrictMode>
); */


/* ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>    
  </React.StrictMode>
); */

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <BrowserRouter>
      <Provider store={store}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<DefaultLayout />}>
          <Route path='/' element={<Navigate to="/dashboard" />} />
          {routes.map((route, index) => {
              return (
                route.element && (
                  <Route
                    key={index}
                    path={route.path}
                    element={<route.element />}
                  />
                )
              );
            })}
          </Route>
        </Route>
      </Routes>
      </Provider>  
      </BrowserRouter>  
  </React.StrictMode>
);
