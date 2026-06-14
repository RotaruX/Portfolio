import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { getApiUrl } from '../utils/api';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { SkillBar } from '../components/ui/SkillBar';

export const Profile = () => {
  const { data: profileData, loading: profileLoading, error: profileError } = useFetch(getApiUrl('api/profile.php'));
  const { data: expData, loading: expLoading } = useFetch(getApiUrl('api/experience.php'));
  const { data: skillsData, loading: skillsLoading } = useFetch(getApiUrl('api/skills.php'));

  if (profileLoading || expLoading || skillsLoading) {
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
        <span>&gt; Cargando perfil...</span>
      </div>
    );
  }

  if (profileError) {
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
        <p style={{ color: '#6b9e7a', lineHeight: 1.6 }}>{profileError}</p>
      </div>
    );
  }

  const profile = profileData?.profile || {};
  const experiences = expData?.experience || [];
  const skillsGrouped = skillsData?.grouped || {};

  const name = profile.full_name;
  const title = profile.title;
  const bio = profile.bio;
  const email = profile.email;
  const phone = profile.phone;
  const location = profile.location;
  const github = profile.github_url || '#';
  const linkedin = profile.linkedin_url || '#';
  const cvUrl = profile.cv_url || '#';
  const profileImg = profile.profile_image;

  const nameParts = name ? name.split(' ') : [];
  const initials = nameParts.length >= 2 
    ? (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase()
    : (name ? name.substring(0, 2).toUpperCase() : 'AA');

  const imageSrc = profileImg || '';
  const cvLink = cvUrl || '#';

  // Formateador de fechas
  const formatDateRange = (startDateStr, endDateStr) => {
    const format = (dateStr) => {
      if (!dateStr) return 'Presente';
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      const formatted = date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
      return formatted.charAt(0).toUpperCase() + formatted.slice(1).replace('.', '');
    };

    const start = format(startDateStr);
    const end = endDateStr ? format(endDateStr) : 'Presente';
    return `${start} - ${end}`;
  };

  // Mapeador de badges de tecnologías
  const getTechBadges = (company, description) => {
    const companyLower = company.toLowerCase();
    const descLower = description ? description.toLowerCase() : '';
    const badges = [];
    
    if (companyLower.includes('rechgo')) {
      badges.push('WordPress', 'PHP', 'JavaScript', 'CSS');
    } else if (companyLower.includes('savour')) {
      badges.push('WordPress');
    } else {
      if (descLower.includes('wordpress')) badges.push('WordPress');
      if (descLower.includes('php')) badges.push('PHP');
      if (descLower.includes('javascript') || descLower.includes('js')) badges.push('JavaScript');
      if (descLower.includes('css')) badges.push('CSS');
      if (descLower.includes('react')) badges.push('React');
      if (descLower.includes('mysql')) badges.push('MySQL');
    }
    return badges;
  };

  const categories = {
    frontend: { title: 'Frontend', icon: 'fa-laptop-code' },
    backend: { title: 'Backend', icon: 'fa-server' },
    tools: { title: 'Herramientas', icon: 'fa-tools' },
    other: { title: 'Otros', icon: 'fa-code-branch' }
  };

  return (
    <>
      <section className="section profile-section">
        <ScrollReveal className="profile-grid-2x2">
          
          {/* TOP-LEFT: Imagen */}
          <div className="profile-cell profile-cell--image">
            <div className="profile-photo-wrapper">
              <div className="profile-photo-inner">
                {imageSrc ? (
                  <img src={imageSrc} alt={name} className="profile-photo-img" />
                ) : (
                  <div className="profile-photo-placeholder">
                    <span>{initials}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* TOP-RIGHT: Sobre Mí */}
          <div className="profile-cell profile-cell--about">
            <div className="profile-glass-card">
              <h3 className="profile-card-title">
                <i className="fas fa-user"></i> Sobre Mí
              </h3>
              <h1 className="profile-name">{name}</h1>
              <h2 className="profile-role">{title}</h2>
              <div className="profile-bio">
                <p style={{ whiteSpace: 'pre-line' }}>{bio}</p>
              </div>
              {cvLink !== '#' && (
                <div className="profile-cv-container">
                  <a href={cvLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-rounded">
                    <i className="fas fa-download"></i> Descargar CV
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* BOTTOM-LEFT: Contacto */}
          <div className="profile-cell profile-cell--contact">
            <div className="profile-glass-card">
              <h3 className="profile-card-title">
                <i className="fas fa-address-card"></i> Contacto
              </h3>
              
              <ul className="contact-list">
                <li className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <span className="contact-label">Email</span>
                    <a href={`mailto:${email}`} className="contact-link">{email}</a>
                  </div>
                </li>
                
                <li className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <span className="contact-label">Teléfono</span>
                    <a href={`tel:${phone}`} className="contact-link">{phone}</a>
                  </div>
                </li>
                
                <li className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <span className="contact-label">Ubicación</span>
                    <span className="contact-text">{location}</span>
                  </div>
                </li>
              </ul>
              
              <hr className="profile-divider" />
              
              <h3 className="profile-card-title">
                <i className="fas fa-link"></i> Redes
              </h3>
              
              <div className="social-links-wrapper">
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="social-link profile-social-link" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href={github} target="_blank" rel="noopener noreferrer" className="social-link profile-social-link" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>

          {/* BOTTOM-RIGHT: Experiencia */}
          <div className="profile-cell profile-cell--experience">
            <div className="profile-glass-card">
              <h3 className="profile-card-title">
                <i className="fas fa-briefcase"></i> Experiencia
              </h3>
              
              <div className="timeline">
                <div className="timeline-line"></div>
                
                {experiences.map((exp) => (
                  <div key={exp.id} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-card">
                      <div className="timeline-header">
                        <div>
                          <h4 className="timeline-position">{exp.position}</h4>
                          <div className="timeline-company">
                            <i className="far fa-building"></i> {exp.company}
                          </div>
                        </div>
                        <div className="timeline-date">
                          {formatDateRange(exp.start_date, exp.end_date)}
                        </div>
                      </div>
                      <p className="timeline-desc">{exp.description}</p>
                      
                      <div className="timeline-tech">
                        {getTechBadges(exp.company, exp.description).map((tech, idx) => (
                          <span key={idx} className="tech-badge">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </ScrollReveal>
      </section>

      {/* SECCIÓN DE HABILIDADES DETALLADAS */}
      {Object.keys(skillsGrouped).some(key => skillsGrouped[key]?.length > 0) && (
        <section className="section skills-section-detailed">
          <ScrollReveal className="section-header">
            <h2>Stack Tecnológico</h2>
          </ScrollReveal>
          
          <div className="skills-grid-detailed">
            {Object.entries(categories).map(([key, cat]) => {
              const skills = skillsGrouped[key] || [];
              if (skills.length === 0) return null;

              return (
                <ScrollReveal key={key}>
                  <h3 className="skill-category-title">
                    <i className={`fas ${cat.icon}`}></i> {cat.title}
                  </h3>
                  
                  <div className="skill-list">
                    {skills.map((skill) => (
                      <div key={skill.id}>
                        <div className="skill-item-header">
                          <span className="skill-item-name">
                            {skill.icon_class && (
                              <i className={`${skill.icon_class} skill-item-icon`}></i>
                            )}
                            {skill.name}
                          </span>
                          <span className="skill-level-text">{skill.level}%</span>
                        </div>
                        <SkillBar level={skill.level} />
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};
export default Profile;
