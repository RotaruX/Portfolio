import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Counter } from '../ui/Counter';

export const About = ({ name, bio, location, profileImg, yearsExp, totalProjects, totalTech }) => {
  const nameParts = name ? name.split(' ') : [];
  const initials = nameParts.length >= 2 
    ? (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase()
    : (name ? name.substring(0, 2).toUpperCase() : 'AA');

  const imageSrc = profileImg || '';

  return (
    <ScrollReveal tag="section" id="about" className="section about-section">
      <div className="section-header">
        <h2><span className="section-number">01.</span> Sobre Mí</h2>
      </div>
      
      <div className="about-grid">
        {/* Imagen de perfil con estructura correcta para borde gradient */}
        <div className="about-image-wrapper">
          <div className="about-image-inner">
            {imageSrc ? (
              <img src={imageSrc} alt={name} />
            ) : (
              <span className="about-image-placeholder">{initials}</span>
            )}
          </div>
        </div>
        
        {/* Texto sobre mí */}
        <div className="about-text">
          <p style={{ whiteSpace: 'pre-line' }}>{bio}</p>
          
          <div className="about-location">
            <i className="fas fa-map-marker-alt"></i>
            {location}
          </div>
          
          {/* Estadísticas animadas */}
          <div className="about-stats">
            <div className="stat-item">
              <Counter target={yearsExp} suffix="+" />
              <div className="stat-label">Años de Experiencia</div>
            </div>
            <div className="stat-item">
              <Counter target={totalProjects} suffix="+" />
              <div className="stat-label">Proyectos Completados</div>
            </div>
            <div className="stat-item">
              <Counter target={totalTech} suffix="+" />
              <div className="stat-label">Tecnologías</div>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};
