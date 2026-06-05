import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';

export const CTA = ({ email }) => {
  return (
    <ScrollReveal tag="section" id="contact-cta" className="cta-section">
      <div className="cta-card">
        <h2>¿Interesado en trabajar juntos?</h2>
        <p>
          Estoy buscando nuevas oportunidades como desarrollador. 
          Si tienes un proyecto interesante o una posición abierta, 
          ¡me encantaría escucharte!
        </p>
        <a href={`mailto:${email}`} className="btn btn-primary btn-lg">
          <i className="fas fa-paper-plane"></i> Enviar Mensaje
        </a>
      </div>
    </ScrollReveal>
  );
};
