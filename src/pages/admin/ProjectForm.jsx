import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getApiUrl } from '../../utils/api';

export const ProjectForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    project_url: '',
    github_url: '',
    category: 'web',
    featured: false,
    existing_image_url: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      const fetchProject = async () => {
        try {
          const apiUrl = getApiUrl(`api/admin_projects.php?id=${id}`);
          const res = await fetch(apiUrl, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!res.ok) throw new Error('Error al cargar proyecto');
          const data = await res.json();
          setFormData({
            title: data.title || '',
            description: data.description || '',
            technologies: data.technologies || '',
            project_url: data.project_url || '',
            github_url: data.github_url || '',
            category: data.category || 'web',
            featured: data.featured == 1,
            existing_image_url: data.image_url || ''
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [id, isEdit, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTechChange = (tech) => {
    setFormData(prev => {
      const currentTechs = prev.technologies ? prev.technologies.split(',').map(t => t.trim()).filter(Boolean) : [];
      let newTechs;
      if (currentTechs.includes(tech)) {
        newTechs = currentTechs.filter(t => t !== tech);
      } else {
        newTechs = [...currentTechs, tech];
      }
      return { ...prev, technologies: newTechs.join(', ') };
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const data = new FormData();
    if (isEdit) data.append('id', id);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('technologies', formData.technologies);
    data.append('project_url', formData.project_url);
    data.append('github_url', formData.github_url);
    data.append('category', formData.category);
    data.append('featured', formData.featured ? 'true' : 'false');
    data.append('existing_image_url', formData.existing_image_url);
    
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      const apiUrl = getApiUrl('api/admin_projects.php');
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: data
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Error al guardar');
      }
      navigate('/admin');
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  if (loading) return <div style={{ color: 'var(--accent-primary)', padding: '2rem', textAlign: 'center' }}>Cargando datos...</div>;

  return (
    <div className="admin-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="admin-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/admin" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
            <i className="fas fa-arrow-left"></i>
          </Link>
          <h2>{isEdit ? 'Editar Proyecto' : 'Añadir Nuevo Proyecto'}</h2>
        </div>
      </div>

      {error && <div className="admin-login-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label>Título *</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              className="admin-input" 
            />
          </div>
          <div className="admin-form-group">
            <label>Categoría</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              className="admin-input"
            >
              <option value="web">Web</option>
              <option value="app">Aplicación</option>
              <option value="other">Otro</option>
            </select>
          </div>
        </div>

        <div className="admin-form-group">
          <label>Descripción</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            rows="4" 
            className="admin-input"
            style={{ resize: 'vertical' }}
          ></textarea>
        </div>

        <div className="admin-form-group">
          <label>Tecnologías</label>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '10px', 
            padding: '15px', 
            borderRadius: 'var(--radius-sm)', 
            border: '1px solid rgba(0, 255, 136, 0.2)', 
            backgroundColor: 'var(--bg-primary)'
          }}>
            {['React', 'HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Node.js', 'WordPress', 'Git', 'TypeScript'].map(tech => {
              const isChecked = formData.technologies.split(',').map(t => t.trim()).includes(tech);
              return (
                <label key={tech} style={{
                  cursor: 'pointer',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  backgroundColor: isChecked ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: isChecked ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: `1px solid ${isChecked ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.1)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={() => handleTechChange(tech)}
                    style={{ display: 'none' }}
                  />
                  {isChecked && <i className="fas fa-check"></i>}
                  {tech}
                </label>
              );
            })}
          </div>
        </div>

        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label>URL del Proyecto (Demo)</label>
            <input 
              type="url" 
              name="project_url" 
              value={formData.project_url} 
              onChange={handleChange} 
              className="admin-input" 
            />
          </div>
          <div className="admin-form-group">
            <label>URL de GitHub</label>
            <input 
              type="url" 
              name="github_url" 
              value={formData.github_url} 
              onChange={handleChange} 
              className="admin-input" 
            />
          </div>
        </div>

        <div className="admin-checkbox-group">
          <label className="admin-checkbox-label">
            <input 
              type="checkbox" 
              id="featured" 
              name="featured" 
              checked={formData.featured} 
              onChange={handleChange} 
              style={{ display: 'none' }} 
            />
            <div className="admin-checkbox-custom">
              {formData.featured && <i className="fas fa-check"></i>}
            </div>
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              Proyecto Destacado (se mostrará en la Home)
            </span>
          </label>
        </div>

        <div className="admin-file-upload">
          <label style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '15px', fontWeight: 600 }}>
            Imagen del Proyecto
          </label>
          
          {formData.existing_image_url && !imageFile && (
            <div className="admin-file-preview">
              <img src={formData.existing_image_url} alt="Vista previa" />
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '8px 0 0 0' }}>
                Imagen actual (se mantendrá si no subes una nueva)
              </p>
            </div>
          )}

          <label className="admin-file-dropzone">
            <i className="fas fa-cloud-upload-alt"></i>
            <span className="admin-file-dropzone-title">
              {imageFile ? imageFile.name : 'Haz clic para seleccionar una imagen'}
            </span>
            <span className="admin-file-dropzone-subtitle">PNG, JPG, WEBP o GIF (Max. 5MB)</span>
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
        </div>

        <div className="admin-form-actions">
          <Link to="/admin" className="btn btn-outline">Cancelar</Link>
          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? 'Guardando...' : 'Guardar Proyecto'}
          </button>
        </div>
      </form>
    </div>
  );
};
