import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import SignUp from "../Pages/Authintication/SignUp";
import SignIn from "../Pages/Authintication/SignIn";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children : [
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/signUp',
        element:<SignUp/>
      },
      {
        path:'/signIn',
        element:<SignIn/>
      }
    ]
  },
]);