import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin, children }) => {
    const { isAuthenticated, user, loading } = useSelector( state => state.user );

    if(loading === false){
        if(isAuthenticated === false){
            return <Navigate to="/login" replace={true} />;
        }

        if(isAdmin === true && user.role !== 'admin'){
            return <Navigate to="/login" replace={true} />;
        }
    }
    return children;
}

export default ProtectedRoute;
