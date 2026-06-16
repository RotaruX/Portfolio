import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
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
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <h2>Acceso Seguro</h2>
          <p>Introduce tus credenciales</p>
        </div>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div className="admin-form-group" style={{ marginBottom: '0' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px' }}>Usuario</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="admin-input"
              autoComplete="username"
            />
          </div>
          
          <div className="admin-form-group" style={{ marginBottom: '0' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px' }}>Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="admin-input"
              autoComplete="current-password"
            />
          </div>
          
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '10px' }}>
            {loading ? 'Verificando...' : 'Entrar al Panel'}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
           <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
             &larr; Volver al Portfolio
           </Link>
        </div>
      </div>
    </div>
  );
};
