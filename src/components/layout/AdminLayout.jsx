import React, { useState } from 'react';
import { Navigate, Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const AdminLayout = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="admin-layout-container">
      {/* Barra superior para móviles */}
      <div className="admin-top-bar">
        <h2>Admin Panel</h2>
        <button 
          className="admin-menu-toggle" 
          onClick={toggleSidebar} 
          aria-label="Abrir navegación lateral"
          aria-expanded={isSidebarOpen}
        >
          <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Overlay de fondo en móvil */}
      <div 
        className={`admin-sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} 
        onClick={closeSidebar}
      ></div>

      {/* Sidebar Admin */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="admin-sidebar-logo">
          <h2>Admin Panel</h2>
          <p>Portfolio Manager</p>
        </div>
        
        <nav className="admin-sidebar-nav">
          <NavLink 
            to="/admin" 
            end
            className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            <i className="fas fa-folder-open"></i> Proyectos
          </NavLink>
          <Link 
            to="/" 
            target="_blank" 
            className="admin-sidebar-link"
            onClick={closeSidebar}
          >
            <i className="fas fa-external-link-alt"></i> Ver Portfolio
          </Link>
        </nav>

        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%', padding: '10px' }}>
            <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

