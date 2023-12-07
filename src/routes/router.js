import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "../Dashboard.jsx";
import DefaultLayout from "../components/DefaultLayout";

import Login from "../views/Login";
import NotFound from "../views/NotFound";
import Signup from "../views/Signup";
import Users from "../views/Users";
import UserForm from "../views/UserForm";
import Patients from "../views/Patients.jsx";
import PatientForm from "../views/PatientForm.jsx";
import Billing from "../views/Billing.jsx";
import Location from "../views/Location.jsx";
import Claim from "../views/Claim.jsx";


const routes = [
  {
    path: '/dashboard',
    element: Dashboard,
    name: "Dashboard",
    breadcrumb: true,
  },
  {
    path: '/users',
    element: Users,
    name: "Users",
    breadcrumb: true,
  },

  {
    path: '/users/new',
    element: UserForm,
    name: "New Uusers",
    breadcrumb: false,
  },
  {
    path: '/users/:id',
    element: UserForm,
    name: "New User",
    breadcrumb: false,
  },
  {
    path: '/patients',
    element: Patients,
    breadcrumb: false,
  },
  {
    path: '/patient-add',
    element: PatientForm,
    breadcrumb: false,
  },
  {
    path: '/create-billing',
    element: Billing,
    breadcrumb: false,
  },
  {
    path: '/create-location',
    element: Location,
    breadcrumb: false,
  },
  {
    path: '/claims',
    element: Claim,
    breadcrumb: false,
  },

 
]

export default routes;
