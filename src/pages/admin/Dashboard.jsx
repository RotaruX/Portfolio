import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getApiUrl } from '../../utils/api';

export const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const apiUrl = getApiUrl('api/admin_projects.php');
      const res = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Error al cargar los proyectos');
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) return;
    
    try {
      const apiUrl = getApiUrl(`api/admin_projects.php?id=${id}`);
      const res = await fetch(apiUrl, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id));
      } else {
        alert('Error al eliminar');
      }
    } catch (err) {
      console.error(err);
      alert('Error en la conexión');
    }
  };

  if (loading) return <div style={{ color: 'var(--accent-primary)', padding: '2rem', textAlign: 'center' }}>Cargando proyectos...</div>;
  if (error) return <div style={{ color: '#ff4444', padding: '2rem', textAlign: 'center' }}>{error}</div>;

  return (
    <div>
      <div className="admin-page-header">
        <h1>Gestión de Proyectos</h1>
        <Link to="/admin/projects/new" className="btn btn-primary">
          <i className="fas fa-plus"></i> Añadir Proyecto
        </Link>
      </div>

      <div className="admin-table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Título</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No hay proyectos. Añade uno nuevo.
                </td>
              </tr>
            ) : projects.map(p => (
              <tr key={p.id}>
                <td>
                  {p.image_url ? (
                    <img 
                      src={p.image_url} 
                      alt={p.title} 
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--glass-border)' }} 
                    />
                  ) : (
                    <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)' }}>
                      <i className="fas fa-image" style={{ color: 'var(--text-secondary)' }}></i>
                    </div>
                  )}
                </td>
                <td style={{ fontWeight: 500 }}>{p.title}</td>
                <td style={{ textTransform: 'capitalize', color: 'var(--text-secondary)' }}>{p.category}</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link 
                      to={`/admin/projects/edit/${p.id}`} 
                      className="btn btn-outline" 
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    >
                      <i className="fas fa-edit"></i> Editar
                    </Link>
                    <button 
                      onClick={() => handleDelete(p.id)} 
                      className="btn btn-outline" 
                      style={{ padding: '6px 12px', fontSize: '0.8rem', borderColor: '#ff4444', color: '#ff4444' }}
                    >
                      <i className="fas fa-trash"></i> Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
