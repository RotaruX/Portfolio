<?php
/**
 * Header - Cabecera del sitio
 * 
 * Incluye la estructura HTML inicial, metadatos, hojas de estilo,
 * navegación principal y detección de página activa.
 */

// Detectar la página actual para marcar el enlace activo
$current_page = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Portafolio de desarrollador web y aplicaciones. Proyectos, habilidades y experiencia profesional.">
    <meta name="author" content="DevPortfolio">
    <meta name="theme-color" content="#0a1a0f">
    
    <title>DevPortfolio | Desarrollador Web &amp; App</title>
    
    <!-- Google Fonts: Inter y JetBrains Mono -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    
    <!-- Devicon - Iconos de tecnologías -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
    
    <!-- Font Awesome 6 - Iconos generales -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer">
    
    <!-- Hoja de estilos principal -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- ============================================ -->
    <!-- CABECERA PRINCIPAL Y NAVEGACIÓN              -->
    <!-- ============================================ -->
    <header class="main-header">
        <nav class="nav-container">
            <!-- Logo / Marca -->
            <a href="index.php" class="nav-logo dynamic-logo">
                <div class="logo-icon">
                    <span class="logo-letter">A</span>
                    <span class="logo-letter">A</span>
                    <span class="logo-letter">R</span>
                    <span class="logo-letter">A</span>
                </div>
                <span class="logo-text">Alexandru</span>
            </a>
            
            <!-- Enlaces de navegación -->
            <ul class="nav-links">
                <li>
                    <a href="index.php" class="nav-link <?= ($current_page === 'index.php') ? 'active' : '' ?>">
                        <i class="fas fa-home"></i> Inicio
                    </a>
                </li>
                <li>
                    <a href="profile.php" class="nav-link <?= ($current_page === 'profile.php') ? 'active' : '' ?>">
                        <i class="fas fa-user"></i> Perfil
                    </a>
                </li>
                <li>
                    <a href="projects.php" class="nav-link <?= ($current_page === 'projects.php') ? 'active' : '' ?>">
                        <i class="fas fa-code"></i> Proyectos
                    </a>
                </li>
            </ul>
            
            <!-- Botón hamburguesa para móvil -->
            <button class="nav-toggle" aria-label="Abrir menú de navegación" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    </header>
    
    <!-- Contenido principal -->
    <main>
