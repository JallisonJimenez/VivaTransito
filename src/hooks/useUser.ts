import { useMemo } from 'react';

export function useUser() {
  const token = localStorage.getItem('token');
  return useMemo(() => {
    if (!token) return { isOrientador: false, verified: false };
    try {
      const { isOrientador, verified } = JSON.parse(atob(token.split('.')[1]));
      return { isOrientador: !!isOrientador, verified: !!verified };
    } catch {
      return { isOrientador: false, verified: false };
    }
  }, [token]);
}
