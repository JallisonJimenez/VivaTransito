// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: Props) {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token && token.split('.').length === 3;
  const location = useLocation();

  return isAuthenticated
    ? <>{children}</>
    : <Navigate to="/login" replace state={{ from: location }} />;
}
