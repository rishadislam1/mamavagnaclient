import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import ProfilePage from "../pages/ProfilePage/ProfilePage.jsx";
import MainLayout from "../Layout/MainLayout.jsx";
import BuyerListPage from "../pages/BuyerListPage/BuyerListPage.jsx";
import DashboardPage from "../pages/DashboardPage/DashboardPage.jsx";
import LedgerPage from "../pages/LedgerPage/LedgerPage.jsx";
import ReportPage from "../pages/ReportPage/ReportPage.jsx";
import PrivateRoute from "./PrivateRoutes.jsx";
import PublicRoute from "./PublicRoutes.jsx";
import AddUserPage from "../pages/AdduserPage/AddUserPage.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicRoute><LoginPage/></PublicRoute>
    },
    {
        path: '/user',
        element: <PrivateRoute><MainLayout/></PrivateRoute>,
        children: [
            {
                path: '/user/dashboard',
                element: <DashboardPage/>
            },
            {
                path: '/user/profile',
                element: <ProfilePage/>
            },
            {
                path:'/user/buyer',
                element: <BuyerListPage/>
            },
            {
                path: '/user/ledger',
                element: <LedgerPage/>
            },
            {
                path: '/user/report',
                element: <ReportPage/>
            },
            {
                path: '/user/addUser',
                element: <AddUserPage/>
            },
            
        ]
    }
])