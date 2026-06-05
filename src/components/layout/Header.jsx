import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    const nextState = !menuOpen;
    setMenuOpen(nextState);
    if (nextState) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close menu on click outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e) => {
      const toggle = document.querySelector('.nav-toggle');
      const navLinks = document.querySelector('.nav-links');
      if (toggle && !toggle.contains(e.target) && navLinks && !navLinks.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  return (
    <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        {/* Logo / Marca */}
        <Link to="/" className="nav-logo dynamic-logo" onClick={closeMenu}>
          <div className="logo-icon">
            <span className="logo-letter">A</span>
            <span className="logo-letter">A</span>
            <span className="logo-letter">R</span>
            <span className="logo-letter">A</span>
          </div>
          <span className="logo-text">Alexandru</span>
        </Link>

        {/* Enlaces de navegación */}
        <ul className={`nav-links ${menuOpen ? 'nav-active' : ''}`}>
          <li>
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu} end>
              <i className="fas fa-home"></i> Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
              <i className="fas fa-user"></i> Perfil
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
              <i className="fas fa-code"></i> Proyectos
            </NavLink>
          </li>
        </ul>

        {/* Botón hamburguesa para móvil */}
        <button
          className={`nav-toggle ${menuOpen ? 'active' : ''}`}
          aria-label="Abrir menú de navegación"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
};
