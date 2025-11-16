import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();

  const isAuthenticated = !!(auth && auth.token);

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default ProtectedRoute;
