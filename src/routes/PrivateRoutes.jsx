/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({children}) => {
    const isLoggedIn = useAuth();
    const location = useLocation();

    if(isLoggedIn){
        return children;
    }
    else{
        return <Navigate to='/' state={{from: location}} replace ></Navigate>
    }
};

export default PrivateRoute;