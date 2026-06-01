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

-- Usuario administrador por defecto
-- IMPORTANTE: Cambiar la contraseña después del primer inicio de sesión.
-- La contraseña actual es 'password' (hash bcrypt genérico para desarrollo).
-- Generar un nuevo hash con: password_hash('tu_nueva_contraseña', PASSWORD_BCRYPT)
INSERT INTO `admin_users` (`username`, `password`) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Perfil del desarrollador (datos de ejemplo - reemplazar con datos reales)
INSERT INTO `profile` (`full_name`, `title`, `bio`, `email`, `phone`, `location`, `github_url`, `linkedin_url`, `cv_url`, `profile_image`) VALUES
(
  'Carlos García López',
  'Desarrollador Web & App Full Stack',
  'Soy un desarrollador full stack apasionado por crear experiencias digitales excepcionales. Con más de 4 años de experiencia en el desarrollo de aplicaciones web y móviles, me especializo en construir soluciones robustas y escalables que combinan un diseño elegante con una arquitectura sólida. Mi enfoque se centra en escribir código limpio, mantenible y eficiente, siempre buscando las mejores prácticas y las tecnologías más actuales. Me encanta resolver problemas complejos y transformar ideas en productos digitales funcionales que generen valor real para los usuarios.',
  'carlos.garcia@email.com',
  '+34 612 345 678',
  'Madrid, España',
  'https://github.com/carlosgarcia',
  'https://linkedin.com/in/carlosgarcia',
  'assets/docs/cv_carlos_garcia.pdf',
  'assets/img/profile.jpg'
);

-- Proyectos de ejemplo (6 proyectos: 3 web, 2 app, 1 other)
INSERT INTO `projects` (`title`, `description`, `technologies`, `image_url`, `project_url`, `github_url`, `category`, `featured`, `created_at`) VALUES
(
  'E-Commerce Moderno - TiendaPlus',
  'Plataforma de comercio electrónico completa con carrito de compras, pasarela de pagos integrada, panel de administración y sistema de gestión de inventario. Diseño responsive con experiencia de usuario optimizada para conversiones.',
  'PHP, MySQL, JavaScript, Stripe, Bootstrap',
  'assets/img/projects/ecommerce.jpg',
  'https://tiendaplus-demo.com',
  'https://github.com/carlosgarcia/tiendaplus',
  'web',
  1,
  '2026-01-15 10:00:00'
),
(
  'Dashboard Analítico - DataVision',
  'Panel de control interactivo para visualización de datos empresariales en tiempo real. Incluye gráficos dinámicos, reportes exportables y sistema de alertas personalizables con notificaciones push.',
  'React, Node.js, Chart.js, MongoDB, WebSocket',
  'assets/img/projects/dashboard.jpg',
  'https://datavision-demo.com',
  'https://github.com/carlosgarcia/datavision',
  'web',
  1,
  '2025-11-20 14:30:00'
),
(
  'Red Social Deportiva - FitConnect',
  'Aplicación web social para deportistas que permite compartir rutinas de entrenamiento, seguir progreso físico y conectar con otros usuarios. Sistema de logros gamificado y planificador de entrenamientos.',
  'Laravel, Vue.js, MySQL, Redis, Tailwind CSS',
  'assets/img/projects/social.jpg',
  'https://fitconnect-demo.com',
  'https://github.com/carlosgarcia/fitconnect',
  'web',
  1,
  '2025-08-10 09:00:00'
),
(
  'App de Gestión de Tareas - TaskFlow',
  'Aplicación móvil multiplataforma para gestión de proyectos y tareas con colaboración en equipo. Incluye tableros Kanban, calendario integrado, asignación de responsables y seguimiento de tiempo.',
  'React Native, Firebase, Redux, Node.js',
  'assets/img/projects/taskflow.jpg',
  'https://taskflow-demo.com',
  'https://github.com/carlosgarcia/taskflow',
  'app',
  0,
  '2025-05-22 11:15:00'
),
(
  'App de Recetas Saludables - NutriChef',
  'Aplicación móvil de recetas con sistema de recomendación basado en preferencias alimentarias y restricciones dietéticas. Incluye lista de compras automática y planificación de menú semanal.',
  'Flutter, Dart, Firebase, API REST, SQLite',
  'assets/img/projects/nutrichef.jpg',
  'https://nutrichef-demo.com',
  'https://github.com/carlosgarcia/nutrichef',
  'app',
  0,
  '2025-03-18 16:45:00'
),
(
  'CLI Automatización DevOps - AutoDeploy',
  'Herramienta de línea de comandos para automatizar despliegues, gestión de servidores y pipelines de CI/CD. Compatible con Docker, AWS y configuraciones multi-entorno con rollback automático.',
  'Python, Docker, AWS SDK, Bash, YAML',
  'assets/img/projects/cli.jpg',
  'https://github.com/carlosgarcia/autodeploy',
  'https://github.com/carlosgarcia/autodeploy',
  'other',
  0,
  '2025-01-05 08:30:00'
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
('Node.js',    'backend',  75, 'devicon-nodejs-plain');

-- Experiencia laboral (2 entradas de ejemplo)
INSERT INTO `experience` (`company`, `position`, `description`, `start_date`, `end_date`) VALUES
(
  'TechSolutions S.L.',
  'Desarrollador Full Stack Senior',
  'Lideré el desarrollo de aplicaciones web empresariales utilizando PHP, Laravel y Vue.js. Implementé arquitecturas escalables, optimicé consultas de base de datos y mentoricé a desarrolladores junior. Participé activamente en la planificación de sprints y revisiones de código.',
  '2024-03-01',
  NULL
),
(
  'Agencia Digital CreativeWeb',
  'Desarrollador Web Junior',
  'Desarrollé sitios web responsive para diversos clientes utilizando HTML, CSS, JavaScript y WordPress. Colaboré en proyectos de e-commerce con WooCommerce y participé en la migración de aplicaciones legacy a tecnologías modernas.',
  '2022-06-15',
  '2024-02-28'
);
