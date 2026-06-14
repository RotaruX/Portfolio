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

  if (loading) return <div style={{color:'#00ff88'}}>Cargando datos...</div>;

  const inputStyle = { width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid rgba(0, 255, 136, 0.2)', backgroundColor: '#0a1a0f', color: '#e0f2e8', outline: 'none', marginBottom: '1rem' };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#0f2318', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(0, 255, 136, 0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <Link to="/admin" style={{ color: '#6b9e7a', marginRight: '1rem', textDecoration: 'none' }}>
          <i className="fas fa-arrow-left"></i>
        </Link>
        <h2 style={{ color: '#00ff88', margin: 0 }}>{isEdit ? 'Editar Proyecto' : 'Añadir Nuevo Proyecto'}</h2>
      </div>

      {error && <div style={{ color: '#ff4444', marginBottom: '1rem' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', color: '#e0f2e8', marginBottom: '8px' }}>Título *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', color: '#e0f2e8', marginBottom: '8px' }}>Categoría</label>
            <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
              <option value="web">Web</option>
              <option value="app">Aplicación</option>
              <option value="other">Otro</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', color: '#e0f2e8', marginBottom: '8px' }}>Descripción</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" style={{...inputStyle, resize: 'vertical'}}></textarea>
        </div>

        <div>
          <label style={{ display: 'block', color: '#e0f2e8', marginBottom: '8px' }}>Tecnologías</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '15px', borderRadius: '6px', border: '1px solid rgba(0, 255, 136, 0.2)', backgroundColor: '#0a1a0f', marginBottom: '1rem' }}>
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
                  color: isChecked ? '#00ff88' : '#6b9e7a',
                  border: `1px solid ${isChecked ? '#00ff88' : 'rgba(255, 255, 255, 0.1)'}`,
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', color: '#e0f2e8', marginBottom: '8px' }}>URL del Proyecto (Demo)</label>
            <input type="url" name="project_url" value={formData.project_url} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', color: '#e0f2e8', marginBottom: '8px' }}>URL de GitHub</label>
            <input type="url" name="github_url" value={formData.github_url} onChange={handleChange} style={inputStyle} />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <div style={{
              width: '24px', height: '24px', borderRadius: '6px', 
              border: `2px solid ${formData.featured ? '#00ff88' : 'rgba(0, 255, 136, 0.4)'}`,
              backgroundColor: formData.featured ? 'rgba(0, 255, 136, 0.2)' : 'transparent',
              display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px',
              transition: 'all 0.2s ease'
            }}>
              {formData.featured && <i className="fas fa-check" style={{ color: '#00ff88', fontSize: '0.8rem' }}></i>}
            </div>
            <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} style={{ display: 'none' }} />
            <span style={{ color: '#e0f2e8', fontWeight: 500 }}>Proyecto Destacado (se mostrará en la Home)</span>
          </label>
        </div>

        <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'rgba(0, 255, 136, 0.03)', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.1)' }}>
          <label style={{ display: 'block', color: '#e0f2e8', marginBottom: '15px', fontWeight: 600 }}>Imagen del Proyecto</label>
          
          {formData.existing_image_url && !imageFile && (
            <div style={{ marginBottom: '15px' }}>
              <img src={formData.existing_image_url} alt="Vista previa" style={{ maxWidth: '200px', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.2)' }} />
              <p style={{ color: '#6b9e7a', fontSize: '0.85rem', margin: '8px 0 0 0' }}>Imagen actual (se mantendrá si no subes una nueva)</p>
            </div>
          )}

          <label style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '2rem', border: '2px dashed rgba(0, 255, 136, 0.3)', borderRadius: '8px', 
            cursor: 'pointer', transition: 'all 0.3s ease', backgroundColor: 'rgba(0, 0, 0, 0.2)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0, 255, 136, 0.05)'; e.currentTarget.style.borderColor = '#00ff88'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'; e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)'; }}
          >
            <i className="fas fa-cloud-upload-alt" style={{ fontSize: '2.5rem', color: '#00ff88', marginBottom: '15px' }}></i>
            <span style={{ color: '#e0f2e8', fontWeight: 500, fontSize: '1.1rem', marginBottom: '5px' }}>
              {imageFile ? imageFile.name : 'Haz clic para seleccionar una imagen'}
            </span>
            <span style={{ color: '#6b9e7a', fontSize: '0.85rem' }}>PNG, JPG, WEBP o GIF (Max. 5MB)</span>
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Link to="/admin" className="btn btn-outline" style={{ padding: '12px 20px', textDecoration: 'none' }}>Cancelar</Link>
          <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: '12px 20px' }}>
            {saving ? 'Guardando...' : 'Guardar Proyecto'}
          </button>
        </div>
      </form>
    </div>
  );
};
