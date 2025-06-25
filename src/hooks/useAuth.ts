import { useEffect, useState } from 'react';

export function useAuth() {
  const [autenticado, setAutenticado] = useState<boolean>(false);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAutenticado(false);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUsuarioId(payload.id);
      setAutenticado(true);
    } catch (error) {
      console.error('Token inválido');
      setAutenticado(false);
    }
  }, []);

  return { autenticado, usuarioId };
}
