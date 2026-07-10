import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';

export const CTA = ({ email }) => {
  return (
    <ScrollReveal tag="section" id="contact-cta" className="cta-section">
      <div className="cta-card">
        <h2>¿Buscas un desarrollador Backend Java?</h2>
        <p>
          Estoy buscando oportunidades como desarrollador Java / Spring Boot, 
          preferiblemente en remoto. Si tienes una posición abierta o un proyecto 
          donde pueda aportar, ¡me encantaría escucharte!
        </p>
        <a href={`mailto:${email}`} className="btn btn-primary btn-lg">
          <i className="fas fa-paper-plane"></i> Enviar Mensaje
        </a>
      </div>
    </ScrollReveal>
  );
};
