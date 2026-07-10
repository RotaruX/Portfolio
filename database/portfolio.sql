-- ============================================================
-- PORTFOLIO DB - Script de creación de base de datos
-- ============================================================
-- Este script crea la base de datos y todas las tablas necesarias
-- para el portafolio de desarrollador web/app.
-- Ejecutar este archivo en phpMyAdmin o desde la línea de comandos.
-- ============================================================

-- Crear la base de datos con codificación UTF8MB4
CREATE DATABASE IF NOT EXISTS `qaqu742`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `qaqu742`;

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
  'Desarrollador Backend Java | Spring Boot',
  'Desarrollador backend en formación con base sólida en Java y Spring Boot. Graduado del Grado Superior en Desarrollo de Aplicaciones Web (DAW) y con formación adicional en Sistemas de Telecomunicaciones e Informáticos. He desarrollado APIs REST con Spring Boot y Spring Security, gestionando persistencia con SQL y contenerización con Docker. Persona responsable, adaptable y con gran capacidad de aprendizaje. Busco incorporarme a una empresa, preferiblemente en remoto, para crecer como desarrollador Java aportando compromiso y ganas de asumir nuevos retos técnicos.',
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

-- Habilidades técnicas (niveles reordenados para destacar stack Java backend)
INSERT INTO `skills` (`name`, `category`, `level`, `icon_class`) VALUES
('Java',            'backend',  90, 'devicon-java-plain'),
('Spring Boot',     'backend',  85, 'devicon-spring-plain'),
('Spring Security', 'backend',  80, 'devicon-spring-plain'),
('MySQL',           'backend',  82, 'devicon-mysql-plain'),
('Git',             'tools',    90, 'devicon-git-plain'),
('Docker',          'tools',    70, 'devicon-docker-plain'),
('JavaScript',      'frontend', 80, 'devicon-javascript-plain'),
('PHP',             'backend',  78, 'devicon-php-plain'),
('HTML',            'frontend', 85, 'devicon-html5-plain'),
('CSS',             'frontend', 80, 'devicon-css3-plain'),
('React',           'frontend', 70, 'devicon-react-original'),
('Node.js',         'backend',  68, 'devicon-nodejs-plain'),
('Angular',         'frontend', 60, 'devicon-angularjs-plain');

-- Experiencia laboral (datos reales del CV)
INSERT INTO `experience` (`company`, `position`, `description`, `start_date`, `end_date`) VALUES
(
  'Rechgo',
  'Desarrollador Web',
  'Desarrollo y mantenimiento de páginas web con WordPress. Personalización de temas y plugins con PHP, HTML, CSS y JavaScript. Adaptación de diseños a dispositivos móviles (responsive design).',
  '2026-03-01',
  '2026-05-31'
),
(
  'Insyte Instalaciones',
  'Técnico de radio',
  'Instalación y configuración de equipos. Trabajo técnico y resolución de problemas en infraestructura de telecomunicaciones.',
  '2023-03-01',
  '2024-07-31'
),
(
  'Restauración',
  'Atención al cliente',
  'Trabajo en varios locales de restauración. Desarrollo de habilidades de atención al cliente, trabajo en equipo y gestión de tiempos.',
  '2018-01-01',
  NULL
);
