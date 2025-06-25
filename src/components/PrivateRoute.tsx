import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: Props) {
  const token = localStorage.getItem('token');

  // Verifica se o token é válido (existente e no formato JWT)
  const isAuthenticated = token && token.split('.').length === 3;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}
