import React, { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { getApiUrl } from '../utils/api';
import { ScrollReveal } from '../components/ui/ScrollReveal';

export const Projects = () => {
  const { data, loading, error } = useFetch(getApiUrl('api/projects.php'));
  const [detailedProject, setDetailedProject] = useState(null);

  useEffect(() => {
    if (detailedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [detailedProject]);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setDetailedProject(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const parseFeatures = (featuresStr) => {
    try {
      return JSON.parse(featuresStr);
    } catch {
      return null;
    }
  };

  return (
    <section className="section projects-page-section" style={{ paddingTop: '140px' }}>
      <ScrollReveal className="section-header">
        <h2>Mis Proyectos</h2>
        <p className="section-subtitle">Explora los proyectos que he desarrollado con sus funcionalidades detalladas</p>
      </ScrollReveal>

      <div className="projects-grid">
        {projects.map((project) => {
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
                <p>
                  {project.description && project.description.length > 140
                    ? `${project.description.substring(0, 140)}...`
                    : project.description}
                </p>

                <div className="project-tech">
                  {techs.map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech}</span>
                  ))}
                </div>

                <div className="project-links" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {project.project_url && (
                      <a href={project.project_url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <i className="fas fa-external-link-alt" style={{ fontSize: '0.8rem' }}></i> Demo
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <i className="fab fa-github" style={{ fontSize: '0.8rem' }}></i> Código
                      </a>
                    )}
                  </div>
                  <button
                    className="btn btn-outline"
                    style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                    onClick={() => setDetailedProject(project)}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Modal de Detalles del Proyecto */}
      {detailedProject && (
        <div className="project-modal-overlay" onClick={() => setDetailedProject(null)}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="project-modal-close" onClick={() => setDetailedProject(null)} aria-label="Cerrar detalles">
              <i className="fas fa-times"></i>
            </button>

            <div className="project-modal-body">
              <div>
                <div className="project-modal-meta">
                  <span className="project-category-badge">{detailedProject.category}</span>
                </div>
                <h3 className="project-modal-title">{detailedProject.title}</h3>
              </div>

              {/* Tecnologías */}
              <div className="project-tech" style={{ margin: '0' }}>
                {detailedProject.technologies?.split(',').map((t) => t.trim()).filter(Boolean).map((tech, idx) => (
                  <span key={idx} className="tech-badge">{tech}</span>
                ))}
              </div>

              {/* Descripción completa */}
              <div className="project-long-desc" style={{ marginTop: '0', marginBottom: '0' }}>
                <h4><i className="fas fa-info-circle"></i> Descripción del Proyecto</h4>
                <p className="project-modal-desc">{detailedProject.long_description || detailedProject.description}</p>
              </div>

              {/* Roles y Funcionalidades */}
              {parseFeatures(detailedProject.features) && parseFeatures(detailedProject.features).length > 0 && (
                <div className="project-roles-section">
                  <h4><i className="fas fa-users"></i> Roles y Funcionalidades</h4>
                  <div className="project-roles-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    {parseFeatures(detailedProject.features).map((role, idx) => (
                      <div key={idx} className="role-card" style={{ '--role-color': role.color, padding: '20px' }}>
                        <div className="role-card-header" style={{ marginBottom: '12px' }}>
                          <div className="role-icon-wrapper" style={{ width: '36px', height: '36px', borderRadius: '8px', fontSize: '0.95rem', background: `${role.color}15`, borderColor: `${role.color}30` }}>
                            <i className={role.icon} style={{ color: role.color }}></i>
                          </div>
                          <h5 className="role-name" style={{ color: role.color, fontSize: '0.95rem' }}>{role.role}</h5>
                        </div>
                        <ul className="role-permissions" style={{ gap: '8px' }}>
                          {role.permissions.map((perm, pIdx) => (
                            <li key={pIdx} style={{ fontSize: '0.82rem' }}>
                              <i className="fas fa-check" style={{ color: role.color, fontSize: '0.65rem' }}></i>
                              <span>{perm}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Enlaces de Acción del Modal */}
              <div className="project-detail-actions" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '20px', marginTop: '10px' }}>
                {detailedProject.github_url && (
                  <a href={detailedProject.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                    <i className="fab fa-github"></i> Código
                  </a>
                )}
                {detailedProject.project_url && (
                  <a href={detailedProject.project_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                    <i className="fas fa-external-link-alt"></i> Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {projects.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '50px 0' }}>
          <i className="fas fa-folder-open" style={{ fontSize: '3rem', color: 'var(--accent-primary)', marginBottom: '15px', display: 'block' }}></i>
          <p>No se encontraron proyectos.</p>
        </div>
      )}
    </section>
  );
};

export default Projects;

