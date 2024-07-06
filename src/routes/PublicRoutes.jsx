/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoute = ({children}) => {
    const isLoggedIn = useAuth();

    const location = useLocation();
    const from = location?.state?.from?.pathname;

    if(!isLoggedIn){

        return children;
    }
    else{

        return <Navigate to={from?from:'/user/dashboard'}></Navigate>
    }
};

export default PublicRoute;