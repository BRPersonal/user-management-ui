import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
    const token = localStorage.getItem('token');
    const userRoles = JSON.parse(localStorage.getItem('roles'));

    if (!token) {
        return <Navigate to="/" />;
    }

    if (roles && roles.includes('ADMIN') && userRoles.includes('ADMIN')) {
        return children;
    }

    return children;
};

export default ProtectedRoute;



