-- ============================================================
-- PORTFOLIO DB - Script de creación de base de datos
-- ============================================================
-- Este script crea la base de datos y todas las tablas necesarias
-- para el portafolio de desarrollador web/app.
-- Ejecutar este archivo en phpMyAdmin o desde la línea de comandos.
-- ============================================================

-- Crear la base de datos con codificación UTF8MB4
CREATE DATABASE IF NOT EXISTS `portfolio_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `portfolio_db`;

-- ============================================================
-- TABLA: admin_users
-- Almacena los usuarios administradores del panel
-- ============================================================
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: profile
-- Información personal y de contacto del desarrollador
-- ============================================================
CREATE TABLE IF NOT EXISTS `profile` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(100) NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `bio` TEXT,
  `email` VARCHAR(100),
  `phone` VARCHAR(20),
  `location` VARCHAR(100),
  `github_url` VARCHAR(255),
  `linkedin_url` VARCHAR(255),
  `cv_url` VARCHAR(255),
  `profile_image` VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: projects
-- Proyectos realizados por el desarrollador
-- ============================================================
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `description` TEXT,
  `long_description` TEXT,
  `features` TEXT,
  `technologies` VARCHAR(255),
  `image_url` VARCHAR(255),
  `project_url` VARCHAR(255),
  `github_url` VARCHAR(255),
  `category` ENUM('web', 'app', 'other') DEFAULT 'web',
  `featured` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: skills
-- Habilidades técnicas y su nivel de dominio
-- ============================================================
CREATE TABLE IF NOT EXISTS `skills` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL,
  `category` ENUM('frontend', 'backend', 'tools', 'other') DEFAULT 'other',
  `level` INT DEFAULT 0,
  `icon_class` VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: experience
-- Experiencia laboral del desarrollador
-- ============================================================
CREATE TABLE IF NOT EXISTS `experience` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `company` VARCHAR(100) NOT NULL,
  `position` VARCHAR(100) NOT NULL,
  `description` TEXT,
  `start_date` DATE NOT NULL,
  `end_date` DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- DATOS DE EJEMPLO
-- ============================================================

-- Usuario administrador
INSERT INTO `admin_users` (`username`, `password`) VALUES
('RotaruX', '$2y$10$Uo9jti/K3J11VdUpnvXfOe6Q8D9xoeJ.rF.8AUujGpNiGrEH8.7Mq');

-- Perfil del desarrollador (datos de ejemplo - reemplazar con datos reales)
INSERT INTO `profile` (`full_name`, `title`, `bio`, `email`, `phone`, `location`, `github_url`, `linkedin_url`, `cv_url`, `profile_image`) VALUES
(
  'Alexandru Adrian Rotaru Alergus',
  'Desarrollador Web (Graduado en DAW)',
  'Recién graduado del Grado Superior en Desarrollo de Aplicaciones Web (DAW). Soy un desarrollador apasionado por crear experiencias digitales excepcionales. Actualmente estoy estudiando más tecnologías y frameworks, y estoy dispuesto a aprender cualquier tipo de lenguaje. Mi stack principal incluye: HTML, CSS, JavaScript, PHP, MySQL, React, Node.js y Git.',
  'rotarualex1612@gmail.com',
  '610211872',
  'Elche, Alicante',
  'https://github.com/RotaruX',
  'https://www.linkedin.com/in/alexandru-adrian-rotaru-alergus/',
  'assets/docs/cv.pdf',
  'assets/img/profile.jpg'
);

-- Proyecto Inicial
-- Proyectos
INSERT INTO `projects` (`title`, `description`, `long_description`, `features`, `technologies`, `image_url`, `project_url`, `github_url`, `category`, `featured`, `created_at`) VALUES
(
  'Otaku Store',
  'Tienda online especializada en productos anime y manga con sistema de roles, carrito de compras y panel de administración completo.',
  'Otaku Store es una tienda online completa especializada en productos de anime y manga. El proyecto implementa un sistema de autenticación y autorización con tres niveles de acceso diferenciados: usuario invitado, usuario registrado y administrador. Cada rol tiene permisos específicos que controlan qué acciones puede realizar dentro de la plataforma.',
  '[{\"role\":\"Invitado\",\"icon\":\"fas fa-eye\",\"color\":\"#6b9e7a\",\"permissions\":[\"Navegar por el catálogo de productos\",\"Ver detalles de cada producto (precio, descripción, imágenes)\",\"Buscar y filtrar productos por categoría\",\"No puede añadir productos al carrito\",\"Debe registrarse o iniciar sesión para comprar\"]},{\"role\":\"Usuario Registrado\",\"icon\":\"fas fa-user\",\"color\":\"#00ff88\",\"permissions\":[\"Todas las funciones del invitado\",\"Añadir productos al carrito de compras\",\"Gestionar su carrito (modificar cantidades, eliminar)\",\"Realizar pedidos y ver historial\",\"Gestionar su perfil de usuario\"]},{\"role\":\"Administrador\",\"icon\":\"fas fa-user-shield\",\"color\":\"#d4a843\",\"permissions\":[\"Añadir nuevos productos al catálogo\",\"Editar y eliminar productos existentes\",\"Gestionar usuarios (ver, editar, eliminar)\",\"Generar y descargar PDF con listado de productos\",\"Acceso completo al panel de administración\"]}]',
  'PHP, MySQL, JavaScript, HTML, CSS, FPDF',
  'assets/img/projects/otaku-store.png',
  'https://otaku-store.es',
  'https://github.com/RotaruX/otaku-store',
  'web',
  1,
  '2026-06-01 10:00:00'
),
(
  'Portfolio Personal',
  'Portafolio web profesional construido con React y Vite, con panel de administración, diseño premium y animaciones modernas.',
  'Mi portafolio personal desarrollado como proyecto del Grado Superior en DAW. Construido con React + Vite en el frontend y PHP + MySQL en el backend. Incluye un panel de administración protegido para gestionar el contenido dinámicamente, diseño responsive con tema verde bosque premium, animaciones suaves y sistema de partículas interactivo.',
  '[{\"role\":\"Visitante\",\"icon\":\"fas fa-globe\",\"color\":\"#00ff88\",\"permissions\":[\"Ver información personal y profesional\",\"Explorar proyectos con descripciones detalladas\",\"Ver habilidades técnicas con niveles\",\"Consultar experiencia laboral\",\"Descargar CV en PDF\"]},{\"role\":\"Administrador\",\"icon\":\"fas fa-user-shield\",\"color\":\"#d4a843\",\"permissions\":[\"Gestionar proyectos (crear, editar, eliminar)\",\"Actualizar perfil y datos personales\",\"Panel de control con estadísticas\",\"Autenticación segura con token\"]}]',
  'React, Vite, JavaScript, PHP, MySQL, CSS',
  '',
  '',
  'https://github.com/RotaruX/Portfolio',
  'web',
  1,
  '2026-06-08 10:00:00'
);

-- Habilidades técnicas (8 habilidades con niveles y clases de devicon)
INSERT INTO `skills` (`name`, `category`, `level`, `icon_class`) VALUES
('HTML',       'frontend', 95, 'devicon-html5-plain'),
('CSS',        'frontend', 90, 'devicon-css3-plain'),
('JavaScript', 'frontend', 88, 'devicon-javascript-plain'),
('PHP',        'backend',  85, 'devicon-php-plain'),
('MySQL',      'backend',  82, 'devicon-mysql-plain'),
('React',      'frontend', 78, 'devicon-react-original'),
('Git',        'tools',    90, 'devicon-git-plain'),
('Node.js',    'backend',  75, 'devicon-nodejs-plain'),
('Java',       'backend',  70, 'devicon-java-plain');

-- Experiencia laboral (datos reales)
INSERT INTO `experience` (`company`, `position`, `description`, `start_date`, `end_date`) VALUES
(
  'Rechgo',
  'Desarrollador Web',
  'Desarrollo y mantenimiento de sitios web con WordPress, además de trabajo directo con código PHP, JavaScript y CSS para personalizar funcionalidades y diseño.',
  '2025-03-01',
  '2025-06-30'
),
(
  'Savour',
  'Desarrollador WordPress',
  'Gestión y desarrollo de contenido web mediante WordPress, enfocado en la creación y optimización de páginas para la empresa.',
  '2025-06-01',
  '2025-06-30'
);
