import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import ProfilePage from "../pages/ProfilePage/ProfilePage.jsx";
import MainLayout from "../Layout/MainLayout.jsx";
import BuyerListPage from "../pages/BuyerListPage/BuyerListPage.jsx";
import DashboardPage from "../pages/DashboardPage/DashboardPage.jsx";
import LedgerPage from "../pages/LedgerPage/LedgerPage.jsx";
import ReportPage from "../pages/ReportPage/ReportPage.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage/>
    },
    {
        path: '/user',
        element: <MainLayout/>,
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
        ]
    }
])