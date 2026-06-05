import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SkillBar } from '../ui/SkillBar';

export const Skills = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <ScrollReveal tag="section" id="skills" className="section skills-section">
      <div className="section-header">
        <h2><span className="section-number">02.</span> Habilidades</h2>
        <p className="section-subtitle">Tecnologías y herramientas con las que trabajo día a día</p>
      </div>
      
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.id} className="skill-card">
            <div className="skill-card-header">
              {skill.icon_class && <i className={skill.icon_class}></i>}
              <span className="skill-level">{skill.level}%</span>
            </div>
            <div className="skill-name">{skill.name}</div>
            <SkillBar level={skill.level} />
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
};
