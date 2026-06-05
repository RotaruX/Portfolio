import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('api/admin_projects.php', {
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
      const res = await fetch(`api/admin_projects.php?id=${id}`, {
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

  if (loading) return <div style={{color:'#00ff88'}}>Cargando proyectos...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#00ff88', margin: 0 }}>Gestión de Proyectos</h1>
        <Link to="/admin/projects/new" className="btn btn-primary" style={{ padding: '10px 20px', textDecoration: 'none' }}>
          <i className="fas fa-plus"></i> Añadir Proyecto
        </Link>
      </div>

      <div style={{ backgroundColor: '#0f2318', borderRadius: '12px', border: '1px solid rgba(0, 255, 136, 0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(0, 255, 136, 0.05)', borderBottom: '1px solid rgba(0, 255, 136, 0.1)' }}>
              <th style={{ padding: '15px 20px', color: '#6b9e7a' }}>Imagen</th>
              <th style={{ padding: '15px 20px', color: '#6b9e7a' }}>Título</th>
              <th style={{ padding: '15px 20px', color: '#6b9e7a' }}>Categoría</th>
              <th style={{ padding: '15px 20px', color: '#6b9e7a' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#6b9e7a' }}>No hay proyectos. Añade uno nuevo.</td>
              </tr>
            ) : projects.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid rgba(0, 255, 136, 0.05)' }}>
                <td style={{ padding: '15px 20px' }}>
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} />
                  ) : (
                    <div style={{ width: '50px', height: '50px', backgroundColor: '#132e1c', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="fas fa-image" style={{ color: '#6b9e7a' }}></i>
                    </div>
                  )}
                </td>
                <td style={{ padding: '15px 20px', color: '#e0f2e8', fontWeight: 500 }}>{p.title}</td>
                <td style={{ padding: '15px 20px', color: '#6b9e7a', textTransform: 'capitalize' }}>{p.category}</td>
                <td style={{ padding: '15px 20px' }}>
                  <Link to={`/admin/projects/edit/${p.id}`} className="btn btn-outline" style={{ padding: '5px 10px', fontSize: '0.8rem', marginRight: '10px', textDecoration: 'none' }}>
                    <i className="fas fa-edit"></i> Editar
                  </Link>
                  <button onClick={() => handleDelete(p.id)} className="btn btn-outline" style={{ padding: '5px 10px', fontSize: '0.8rem', borderColor: '#ff4444', color: '#ff4444' }}>
                    <i className="fas fa-trash"></i> Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
