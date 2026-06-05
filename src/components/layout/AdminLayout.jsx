import React from 'react';
import { Navigate, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const AdminLayout = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0a1a0f', color: '#e0f2e8' }}>
      {/* Sidebar Admin */}
      <aside style={{ width: '250px', backgroundColor: '#0f2318', padding: '2rem', borderRight: '1px solid rgba(0, 255, 136, 0.1)' }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h2 style={{ color: '#00ff88', margin: 0 }}>Admin Panel</h2>
          <p style={{ fontSize: '0.8rem', color: '#6b9e7a', marginTop: '5px' }}>Portfolio Manager</p>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to="/admin" style={{ color: '#e0f2e8', textDecoration: 'none', padding: '10px', borderRadius: '6px', backgroundColor: 'rgba(0, 255, 136, 0.05)' }}>
            <i className="fas fa-folder-open" style={{ marginRight: '10px', width: '20px' }}></i> Proyectos
          </Link>
          <Link to="/" target="_blank" style={{ color: '#e0f2e8', textDecoration: 'none', padding: '10px', borderRadius: '6px' }}>
            <i className="fas fa-external-link-alt" style={{ marginRight: '10px', width: '20px' }}></i> Ver Portfolio
          </Link>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(0, 255, 136, 0.1)', position: 'absolute', bottom: '2rem', width: 'calc(250px - 4rem)' }}>
          <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%', padding: '10px' }}>
            <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};
