// This is another way to use routing in client side. One way was to wrap the <App> using <BrowserRouter> in index.js and then using <Routes> and <Route> componenets to add path and componenets in the <App>

import {createBrowserRouter} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../Components/Signup";
import PrivateRouter from "../layout/PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import Order from "../pages/dashboard/Orders";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Login from "../Components/Login";
import Payment from "../pages/shop/Payment";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children:[              // children of the original route
            {
                path:"/",
                element: <Home/>
            },
            {
                path:"/menu",
                element: 
                    <PrivateRouter>
                        <Menu />
                    </PrivateRouter>  
            },
            {
                path: "/order",
                element: (
                  <PrivateRouter>
                    <Order/>
                  </PrivateRouter>
                ),
            },
            {
                path: "/update-profile",
                element: <UpdateProfile/>
            },
            
            {
                path:"/cart-page",
                element: <CartPage/>
            },
            {
                path:"/process-checkout",
                element: <Payment/>,
            }
        ]
    },
    {
        path:"/signup",
        element: <Signup/>
    },
    {
        path: "/login",
        element: <Login/>
    },

    // For Admin
    {
        path: "/dashboard",
        element: (
            <PrivateRouter>
                <DashboardLayout/>
            </PrivateRouter>
        ),
        children: [
            {
                path: "",
                element: <Dashboard />,
            },
            {
                path: "users",
                element: <Users/>,
            },
            {
                path: "add-menu",
                element: <AddMenu />,
              },
              {
                path: "manage-items",
                element: <ManageItems />,
              },
              {
                path: "update-menu/:id",
                element: <UpdateMenu />,
                loader: ({ params }) =>         // to fetch details of the parameter passed in the path URL
                  fetch(`https://lazeezfoodapp-server.onrender.com/menu/${params.id}`),
              },
        ],

    },
    
])

export default router;