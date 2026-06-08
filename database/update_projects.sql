UPDATE projects SET 
  description = 'Tienda online especializada en productos anime y manga con sistema de roles, carrito de compras y panel de administración completo.',
  long_description = 'Otaku Store es una tienda online completa especializada en productos de anime y manga. El proyecto implementa un sistema de autenticación y autorización con tres niveles de acceso diferenciados: usuario invitado, usuario registrado y administrador. Cada rol tiene permisos específicos que controlan qué acciones puede realizar dentro de la plataforma.',
  features = '[{"role":"Invitado","icon":"fas fa-eye","color":"#6b9e7a","permissions":["Navegar por el catálogo de productos","Ver detalles de cada producto (precio, descripción, imágenes)","Buscar y filtrar productos por categoría","No puede añadir productos al carrito","Debe registrarse o iniciar sesión para comprar"]},{"role":"Usuario Registrado","icon":"fas fa-user","color":"#00ff88","permissions":["Todas las funciones del invitado","Añadir productos al carrito de compras","Gestionar su carrito (modificar cantidades, eliminar)","Realizar pedidos y ver historial","Gestionar su perfil de usuario"]},{"role":"Administrador","icon":"fas fa-user-shield","color":"#d4a843","permissions":["Añadir nuevos productos al catálogo","Editar y eliminar productos existentes","Gestionar usuarios (ver, editar, eliminar)","Generar y descargar PDF con listado de productos","Acceso completo al panel de administración"]}]',
  technologies = 'PHP, MySQL, JavaScript, HTML, CSS, FPDF',
  image_url = 'assets/img/projects/otaku-store.png',
  project_url = 'https://otaku-store.es'
WHERE title = 'Otaku Store';

INSERT INTO projects (title, description, long_description, features, technologies, image_url, project_url, github_url, category, featured, created_at) VALUES
(
  'Portfolio Personal',
  'Portafolio web profesional construido con React y Vite, con panel de administración, diseño premium y animaciones modernas.',
  'Mi portafolio personal desarrollado como proyecto del Grado Superior en DAW. Construido con React + Vite en el frontend y PHP + MySQL en el backend. Incluye un panel de administración protegido para gestionar el contenido dinámicamente, diseño responsive con tema verde bosque premium, animaciones suaves y sistema de partículas interactivo.',
  '[{"role":"Visitante","icon":"fas fa-globe","color":"#00ff88","permissions":["Ver información personal y profesional","Explorar proyectos con descripciones detalladas","Ver habilidades técnicas con niveles","Consultar experiencia laboral","Descargar CV en PDF"]},{"role":"Administrador","icon":"fas fa-user-shield","color":"#d4a843","permissions":["Gestionar proyectos (crear, editar, eliminar)","Actualizar perfil y datos personales","Panel de control con estadísticas","Autenticación segura con token"]}]',
  'React, Vite, JavaScript, PHP, MySQL, CSS',
  '',
  '',
  'https://github.com/RotaruX/Portfolio',
  'web',
  1,
  '2026-06-08 10:00:00'
);
