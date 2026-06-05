import React from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../ui/ScrollReveal';

export const FeaturedProjects = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <ScrollReveal tag="section" id="featured-projects" className="section projects-section">
      <div className="section-header">
        <h2><span className="section-number">03.</span> Proyectos Destacados</h2>
        <p className="section-subtitle">Una selección de mis trabajos más recientes y relevantes</p>
      </div>
      
      <div className="projects-grid">
        {projects.map((project) => {
          const techs = project.technologies 
            ? project.technologies.split(',').map((t) => t.trim()).filter(Boolean) 
            : [];
          
          const imageSrc = project.image_url || '';

          return (
            <article key={project.id} className="project-card">
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
                  {project.description && project.description.length > 150
                    ? `${project.description.substring(0, 150)}...`
                    : project.description}
                </p>
                
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
            </article>
          );
        })}
      </div>
      
      <div className="view-all-link">
        <Link to="/projects">
          Ver todos los proyectos <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </ScrollReveal>
  );
};
