import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      {/* Sección superior del footer */}
      <div className="footer-top">
        <div className="footer-grid">
          {/* Columna 1: Acerca de */}
          <div className="footer-col">
            <Link to="/" className="nav-logo dynamic-logo footer-logo">
              <div className="logo-icon">
                <span className="logo-letter">A</span>
                <span className="logo-letter">A</span>
                <span className="logo-letter">R</span>
                <span className="logo-letter">A</span>
              </div>
            </Link>
            <p className="footer-about-text">
              Desarrollador backend Java con base sólida en Spring Boot y Spring Security. Apasionado por construir APIs robustas y soluciones escalables.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="footer-col">
            <h4 className="footer-title">Enlaces Rápidos</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">
                  <i className="fas fa-chevron-right"></i> Inicio
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <i className="fas fa-chevron-right"></i> Perfil
                </Link>
              </li>
              <li>
                <Link to="/projects">
                  <i className="fas fa-chevron-right"></i> Proyectos
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Redes sociales */}
          <div className="footer-col">
            <h4 className="footer-title">Conectar</h4>
            <div className="footer-social">
              <a
                href="https://github.com/RotaruX/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/alexandru-adrian-rotaru-alergus/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="mailto:rotarualex1612@gmail.com"
                className="social-link"
                aria-label="Email"
              >
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sección inferior del footer */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; {currentYear} DevPortfolio. Todos los derechos reservados.
        </p>
        <p className="footer-made-with">
          Hecho con <i className="fas fa-heart" style={{ color: '#00ff88' }}></i> y React
        </p>
      </div>
    </footer>
  );
};
