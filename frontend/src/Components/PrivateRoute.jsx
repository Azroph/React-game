import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  // On vérifie à la fois le contexte et le token
  if (!isAuthenticated && !token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;