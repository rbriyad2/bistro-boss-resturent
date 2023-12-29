import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Menus from "../Pages/Menus/Menus";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Secret from "../Pages/Secret/Secret";
import PrivateRoute from "../providers/PrivateRoute";
import Dashboard from "../Layouts/Dashboard";
import Mycart from "../Pages/Dashboard/Mycart";
import Allusers from "../Pages/Dashboard/Allusers/Allusers";
import AdminRoutes from "../providers/AdminRoutes";
import Additem from "../Pages/Dashboard/Additem/Additem";
import Manageitems from "../Pages/Dashboard/Manageitems/Manageitems";
import Payment from "../Pages/Dashboard/Payment/Payment";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import Adminhome from "../Pages/Dashboard/Adminhome/Adminhome";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/menus',
          element: <Menus></Menus>
        },
        {
          path: '/order/:category',
          element: <Order></Order>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <Signup></Signup>
        },
        {
          path: '/secret',
          element: <PrivateRoute><Secret></Secret></PrivateRoute>
        }
      ]
    },
    {
      path:'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
          path: 'userhome',
          element: <UserHome></UserHome>
        },
        {
          path:'mycart',
          element: <Mycart></Mycart>
        },
        {
          path:'payment',
          element: <Payment></Payment>
        },
        {
          path: 'adminhome',
          element: <AdminRoutes><Adminhome></Adminhome></AdminRoutes>
        },
        {
          path:'allusers',
          element: <AdminRoutes><Allusers></Allusers></AdminRoutes>
        },
        {
          path:'additem',
          element: <AdminRoutes><Additem></Additem></AdminRoutes>
        },
        {
          path: 'manageitems',
          element: <AdminRoutes><Manageitems></Manageitems></AdminRoutes>
        }
      ]
    }
  ]);