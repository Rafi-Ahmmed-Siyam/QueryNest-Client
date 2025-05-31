import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import SignUp from "../Pages/Authintication/SignUp";
import SignIn from "../Pages/Authintication/SignIn";
import PassResetPage from "../Pages/Authintication/PassResetPage";
import Queries from "../Pages/Queries";
import RecommendationsForMe from "../Pages/RecommendationsForMe";
import MyQueries from "../Pages/MyQueries";
import Myrecommendations from "../Pages/Myrecommendations";
import AddQueries from "../Pages/AddQueries";
import PrivetRoute from "./PrivetRoute";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children : [
      {
        index : true,
        element:<Home/>
      },
      {
        path:'/signUp',
        element:<SignUp/>
      },
      {
        path:'/signIn',
        element:<SignIn/>
      },
      {
        path:'/passReset',
        element:<PassResetPage/>
      },
      {
        path:'/allQueries',
        element:<Queries/>
      },
      {
        path:'/recommendationsForMe',
        element:<RecommendationsForMe/>
      },
      {
        path:'/myQueries',
        element:<PrivetRoute><MyQueries/></PrivetRoute>
      },
      {
        path:'/myRecommendations',
        element:<Myrecommendations/>
      },
      {
        path:'/addQueries',
        element:<PrivetRoute><AddQueries/></PrivetRoute>
      }
    ]
  },
]);