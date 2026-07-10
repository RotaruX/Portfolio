import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ParticlesCanvas } from './ParticlesCanvas';
import { useTypewriter } from '../../hooks/useTypewriter';

export const Hero = ({ name, shortBio, email, yearsExp }) => {
  const heroContentRef = useRef(null);
  const codeBlockRef = useRef(null);

  const typewriterStrings = [
    'Desarrollador Backend Java',
    'Spring Boot & Spring Security',
    'APIs REST & Microservicios',
    'En busca de nuevos retos'
  ];

  const typewriterText = useTypewriter(typewriterStrings);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        const speed = 0.3;
        if (heroContentRef.current) {
          heroContentRef.current.style.transform = `translateY(${scrolled * speed}px)`;
          heroContentRef.current.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
        }
        if (codeBlockRef.current) {
          codeBlockRef.current.style.transform = `translateY(${scrolled * speed * 0.5}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="hero-section">
      <ParticlesCanvas />
      
      <div className="hero-wrapper">
        <div className="hero-content" ref={heroContentRef}>
          <p className="hero-greeting">
            <span className="greeting-prefix">&gt;</span> Hola, mi nombre es
          </p>
          
          <h1>{name}</h1>
          
          <div className="typewriter-container">
            <span className="typewriter-prefix">&gt;</span> 
            <span id="typewriter">{typewriterText}</span><span className="cursor">|</span>
          </div>
          
          <p className="hero-bio">{shortBio}</p>
          
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">
              <i className="fas fa-rocket"></i> Ver Proyectos
            </Link>
            <a href={`mailto:${email}`} className="btn btn-outline">
              <i className="fas fa-envelope"></i> Contactar
            </a>
          </div>
        </div>
        
        <div className="hero-code-block" ref={codeBlockRef}>
          <div className="window-dots">
            <span></span><span></span><span></span>
          </div>
          <div className="code-content">
            <span className="code-comment">// BackendDev.java</span><br />
            <span className="code-key">public class</span> <span className="code-string">BackendDev</span> <span className="code-bracket">{"{"}</span><br />
            &nbsp;&nbsp;<span className="code-key">String</span> nombre = <span className="code-string">"{name}"</span>;<br />
            &nbsp;&nbsp;<span className="code-key">String</span> stack = <span className="code-string">"Java · Spring Boot"</span>;<br />
            &nbsp;&nbsp;<span className="code-key">int</span> experiencia = <span className="code-value">{yearsExp}</span>;<br />
            &nbsp;&nbsp;<span className="code-key">boolean</span> disponible = <span className="code-value">true</span>;<br />
            <span className="code-bracket">{"}"}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
