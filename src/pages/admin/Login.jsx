import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(username, password);
    setLoading(false);
    
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0a1a0f' }}>
      <div style={{ backgroundColor: '#0f2318', padding: '3rem', borderRadius: '12px', border: '1px solid rgba(0, 255, 136, 0.1)', width: '100%', maxWidth: '400px', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: '#00ff88', margin: 0 }}>Acceso Seguro</h2>
          <p style={{ color: '#6b9e7a', marginTop: '10px' }}>Introduce tus credenciales</p>
        </div>

        {error && (
          <div style={{ backgroundColor: 'rgba(255, 68, 68, 0.1)', border: '1px solid #ff4444', color: '#ff4444', padding: '10px', borderRadius: '6px', marginBottom: '1.5rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', color: '#e0f2e8', marginBottom: '8px' }}>Usuario</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid rgba(0, 255, 136, 0.2)', backgroundColor: '#0a1a0f', color: '#e0f2e8', outline: 'none' }}
              autoComplete="username"
            />
          </div>
          <div>
            <label style={{ display: 'block', color: '#e0f2e8', marginBottom: '8px' }}>Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid rgba(0, 255, 136, 0.2)', backgroundColor: '#0a1a0f', color: '#e0f2e8', outline: 'none' }}
              autoComplete="current-password"
            />
          </div>
          
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '10px' }}>
            {loading ? 'Verificando...' : 'Entrar al Panel'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
           <a href="/" style={{ color: '#6b9e7a', textDecoration: 'none', fontSize: '0.9rem' }}>&larr; Volver al Portfolio</a>
        </div>
      </div>
    </div>
  );
};
