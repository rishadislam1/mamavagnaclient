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
import EditBuyer from "../pages/EditBuyer/EditBuyer.jsx";
import MonthBasisBuyerList from "../Components/MonthBasisBuyerList/MonthBasisBuyerList.jsx";
import PdfPage from "../pages/PdfPage/PdfPage.jsx";
import ViewAllData from "../pages/Cashbook/ViewAllData.jsx";
import CashbookMenuPage from "../pages/CashbookMenuPage/CashbookMenuPage.jsx";
import CashbookEdit from "../pages/CashbookEdit/CashbookEdit.jsx";
import AllUsersPage from "../pages/AllUsers/AllUsersPage.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicRoute><LoginPage/></PublicRoute>
    },
    {
        path: '/user',
        element: <PrivateRoute><MainLayout/></PrivateRoute>,
        // element:<MainLayout/>,
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
            {
                path: '/user/editBuyer/:id',
                element: <EditBuyer/>
            },
            {
                path: '/user/month/:month/:year',
                element: <MonthBasisBuyerList/>
            },
            {
                path: '/user/pdf/:name',
                element: <PdfPage/>
            },
            {
                path: '/user/viewalldata',
                element: <ViewAllData/>
            },
            {
                path: '/user/cashbook',
                element: <CashbookMenuPage/>
            },
            {
                path: '/user/viewCash/:date',
                element: <CashbookEdit/>
            },
            {
                path: '/user/allUser',
                element: <AllUsersPage/>
            }
        ]
    }
])