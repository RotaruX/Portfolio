import { useState, useEffect } from 'react';
import { getApiUrl } from '../utils/api';

export const useAuth = () => {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'));
  
  useEffect(() => {
    if (token) {
      localStorage.setItem('admin_token', token);
    } else {
      localStorage.removeItem('admin_token');
    }
  }, [token]);

  const login = async (username, password) => {
    const apiUrl = getApiUrl('api/auth.php');
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success && data.token) {
      setToken(data.token);
      return { success: true };
    }
    return { success: false, error: data.error || 'Error al iniciar sesión' };
  };

  const logout = () => {
    setToken(null);
  };

  return { token, login, logout, isAuthenticated: !!token };
};
