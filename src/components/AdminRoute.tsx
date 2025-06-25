// src/components/AdminRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token');
  if (!token) {
    // Usuário não está logado
    return <Navigate to="/login" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    // Verifica se é orientador
    if (!payload.isOrientador) {
      return <Navigate to="/login" replace />;
    }

    // Se for orientador mas não verificado, redireciona para a Home padrão
    if (!payload.verified) {
      alert("Sua conta ainda não foi verificada. Aguarde autorização do administrador.");
      return <Navigate to="/home" replace />;
    }

    // Tudo certo, renderiza a rota protegida
    return children;

  } catch {
    return <Navigate to="/login" replace />;
  }
}
