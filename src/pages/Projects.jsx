import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useAuth } from '../hooks/useAuth';
import { ScrollReveal } from '../components/ui/ScrollReveal';

export const Projects = () => {
  const { data, loading, error } = useFetch('api/projects.php');
  const [filter, setFilter] = useState('all');
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#0a1a0f',
        color: '#00ff88',
        fontFamily: 'monospace',
        fontSize: '1.2rem'
      }}>
        <div className="logo-icon" style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: '2px solid #00ff88',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          animation: 'pulse-glow 2s infinite',
          marginBottom: '20px'
        }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>A</span>
        </div>
        <span>&gt; Cargando proyectos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" style={{
        margin: '150px auto',
        maxWidth: '600px',
        padding: '2rem',
        textAlign: 'center',
        border: '1px solid rgba(0, 255, 136, 0.1)',
        borderRadius: '12px',
        backgroundColor: '#0f2318',
        color: '#e0f2e8'
      }}>
        <h2 style={{ color: '#00ff88', marginBottom: '1rem' }}>⚠️ Error al cargar datos</h2>
        <p style={{ color: '#6b9e7a', lineHeight: 1.6 }}>{error}</p>
      </div>
    );
  }

  const projects = data?.projects || [];
  
  // Filtrar proyectos por categoría
  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section className="section projects-page-section" style={{ paddingTop: '140px' }}>
      <ScrollReveal className="section-header">
        <h2>Mis Proyectos</h2>
        <p className="section-subtitle">Explora los proyectos que he desarrollado</p>
        
        {/* Filtros de categoría */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          margin: '30px 0 10px',
          flexWrap: 'wrap'
        }}>
          {['all', 'web', 'app', 'other'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`btn ${filter === category ? 'btn-primary' : 'btn-outline'}`}
              style={{
                padding: '8px 20px',
                fontSize: '0.9rem',
                textTransform: 'capitalize'
              }}
            >
              {category === 'all' ? 'Todos' : (category === 'web' ? 'Web' : (category === 'app' ? 'Aplicaciones' : 'Otros'))}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <div className="projects-grid" style={{ marginTop: '40px' }}>
        {filteredProjects.map((project) => {
          const techs = project.technologies 
            ? project.technologies.split(',').map((t) => t.trim()).filter(Boolean) 
            : [];
          
          const imageSrc = project.image_url || '';

          return (
            <ScrollReveal key={project.id} tag="article" className="project-card">
              <div className="project-image">
                {imageSrc ? (
                  <img src={imageSrc} alt={project.title} />
                ) : (
                  <div className="project-image-placeholder">
                    <i className={`fas fa-${project.category === 'web' ? 'globe' : (project.category === 'app' ? 'mobile-alt' : 'terminal')}`}></i>
                  </div>
                )}
                <span className="project-category">{project.category}</span>
              </div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="project-tech">
                  {techs.map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech}</span>
                  ))}
                </div>
                
                <div className="project-links">
                  {project.project_url && (
                    <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-external-link-alt"></i> Demo
                    </a>
                  )}
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github"></i> Código
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '50px 0' }}>
          <i className="fas fa-folder-open" style={{ fontSize: '3rem', color: 'var(--accent-primary)', marginBottom: '15px', display: 'block' }}></i>
          <p>No se encontraron proyectos en esta categoría.</p>
        </div>
      )}
    </section>
  );
};
export default Projects;
