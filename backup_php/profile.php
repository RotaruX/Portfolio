<?php
/**
 * Página de Perfil
 * 
 * Muestra información detallada sobre el desarrollador,
 * incluyendo experiencia, educación (si aplica), contacto y enlaces.
 */

// Conexión a la base de datos
require_once 'includes/db.php';

// Obtener datos del perfil
try {
    $stmt = $pdo->query("SELECT * FROM profile LIMIT 1");
    $profile = $stmt->fetch();
} catch (PDOException $e) {
    $profile = null;
}

// Obtener experiencia
try {
    $stmt = $pdo->query("SELECT * FROM experience ORDER BY start_date DESC");
    $experiences = $stmt->fetchAll();
} catch (PDOException $e) {
    $experiences = [];
}

// Obtener habilidades agrupadas
try {
    $stmt = $pdo->query("SELECT * FROM skills ORDER BY category, level DESC");
    $skills_raw = $stmt->fetchAll();
    
    $skills_grouped = [
        'frontend' => [],
        'backend' => [],
        'tools' => [],
        'other' => []
    ];
    
    foreach ($skills_raw as $skill) {
        $skills_grouped[$skill['category']][] = $skill;
    }
} catch (PDOException $e) {
    $skills_grouped = [];
}

// Datos por defecto si no hay perfil
$name = $profile['full_name'] ?? 'Alexandru Adrian Rotaru Alergus';
$title = $profile['title'] ?? 'Desarrollador Web (Graduado en DAW)';
$bio = $profile['bio'] ?? 'Recién graduado del Grado Superior en Desarrollo de Aplicaciones Web (DAW). Soy un desarrollador apasionado por crear experiencias digitales excepcionales. Actualmente estoy estudiando más tecnologías y frameworks, y estoy dispuesto a aprender cualquier tipo de lenguaje. Mi stack principal incluye: HTML, CSS, JavaScript, PHP, MySQL, React, Node.js y Git.';
$email = $profile['email'] ?? 'rotarualex1612@gmail.com';
$phone = $profile['phone'] ?? '610211872';
$location = $profile['location'] ?? 'Elche, Alicante';
$github = $profile['github_url'] ?? 'https://github.com/RotaruX';
$linkedin = $profile['linkedin_url'] ?? 'https://www.linkedin.com/in/alexandru-adrian-rotaru-alergus/';
$cv_url = $profile['cv_url'] ?? '#';
$profile_img = $profile['profile_image'] ?? 'assets/img/profile.jpg';

// Iniciales para placeholder de imagen
$initials = '';
$name_parts = explode(' ', $name);
if (count($name_parts) >= 2) {
    $initials = mb_strtoupper(mb_substr($name_parts[0], 0, 1) . mb_substr($name_parts[1], 0, 1));
} else {
    $initials = mb_strtoupper(mb_substr($name, 0, 2));
}
?>
<?php require_once 'includes/header.php'; ?>

    <!-- ============================================ -->
    <!-- CABECERA DE PERFIL                           -->
    <!-- ============================================ -->
    <section class="section profile-section">
        <div class="profile-grid-2x2" data-scroll-reveal>
            
            <!-- TOP-LEFT: Imagen -->
            <div class="profile-cell profile-cell--image">
                <div class="profile-photo-wrapper">
                    <div class="profile-photo-inner">
                        <?php if (!empty($profile_img) && file_exists($profile_img)): ?>
                            <img src="<?= htmlspecialchars($profile_img) ?>" alt="<?= htmlspecialchars($name) ?>" class="profile-photo-img">
                        <?php else: ?>
                            <div class="profile-photo-placeholder">
                                <span><?= $initials ?></span>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>

            <!-- TOP-RIGHT: Sobre Mí -->
            <div class="profile-cell profile-cell--about">
                <div class="profile-glass-card">
                    <h3 class="profile-card-title">
                        <i class="fas fa-user"></i> Sobre Mí
                    </h3>
                    <h1 class="profile-name"><?= htmlspecialchars($name) ?></h1>
                    <h2 class="profile-role"><?= htmlspecialchars($title) ?></h2>
                    <div class="profile-bio">
                        <p><?= nl2br(htmlspecialchars($bio)) ?></p>
                    </div>
                    <?php if ($cv_url !== '#'): ?>
                    <div class="profile-cv-container">
                        <a href="<?= htmlspecialchars($cv_url) ?>" target="_blank" class="btn btn-outline btn-rounded">
                            <i class="fas fa-download"></i> Descargar CV
                        </a>
                    </div>
                    <?php endif; ?>
                </div>
            </div>

            <!-- BOTTOM-LEFT: Contacto -->
            <div class="profile-cell profile-cell--contact">
                <div class="profile-glass-card">
                    <h3 class="profile-card-title">
                        <i class="fas fa-address-card"></i> Contacto
                    </h3>
                    
                    <ul class="contact-list">
                        <li class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div>
                                <span class="contact-label">Email</span>
                                <a href="mailto:<?= htmlspecialchars($email) ?>" class="contact-link"><?= htmlspecialchars($email) ?></a>
                            </div>
                        </li>
                        
                        <li class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-phone-alt"></i>
                            </div>
                            <div>
                                <span class="contact-label">Teléfono</span>
                                <a href="tel:<?= htmlspecialchars($phone) ?>" class="contact-link"><?= htmlspecialchars($phone) ?></a>
                            </div>
                        </li>
                        
                        <li class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div>
                                <span class="contact-label">Ubicación</span>
                                <span class="contact-text"><?= htmlspecialchars($location) ?></span>
                            </div>
                        </li>
                    </ul>
                    
                    <hr class="profile-divider">
                    
                    <h3 class="profile-card-title">
                        <i class="fas fa-link"></i> Redes
                    </h3>
                    
                    <div class="social-links-wrapper">
                        <a href="<?= htmlspecialchars($linkedin) ?>" target="_blank" rel="noopener noreferrer" class="social-link profile-social-link">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="<?= htmlspecialchars($github) ?>" target="_blank" rel="noopener noreferrer" class="social-link profile-social-link">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- BOTTOM-RIGHT: Experiencia -->
            <div class="profile-cell profile-cell--experience">
                <div class="profile-glass-card">
                    <h3 class="profile-card-title">
                        <i class="fas fa-briefcase"></i> Experiencia
                    </h3>
                    
                    <div class="timeline">
                        <div class="timeline-line"></div>
                        
                        <!-- Experiencia en Rechgo -->
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="timeline-card">
                                <div class="timeline-header">
                                    <div>
                                        <h4 class="timeline-position">Desarrollador Web</h4>
                                        <div class="timeline-company">
                                            <i class="far fa-building"></i> Rechgo
                                        </div>
                                    </div>
                                    <div class="timeline-date">Mar 2025 - Jun 2025</div>
                                </div>
                                <p class="timeline-desc">
                                    Desarrollo y mantenimiento de sitios web con WordPress, además de trabajo directo con código PHP, JavaScript y CSS para personalizar funcionalidades y diseño.
                                </p>
                                <div class="timeline-tech">
                                    <span class="tech-badge">WordPress</span>
                                    <span class="tech-badge">PHP</span>
                                    <span class="tech-badge">JavaScript</span>
                                    <span class="tech-badge">CSS</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Experiencia en Savour -->
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="timeline-card">
                                <div class="timeline-header">
                                    <div>
                                        <h4 class="timeline-position">Desarrollador WordPress</h4>
                                        <div class="timeline-company">
                                            <i class="far fa-building"></i> Savour
                                        </div>
                                    </div>
                                    <div class="timeline-date">Jun 2025</div>
                                </div>
                                <p class="timeline-desc">
                                    Gestión y desarrollo de contenido web mediante WordPress, enfocado en la creación y optimización de páginas para la empresa.
                                </p>
                                <div class="timeline-tech">
                                    <span class="tech-badge">WordPress</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- ============================================ -->
    <!-- SECCIÓN DE HABILIDADES DETALLADAS            -->
    <!-- ============================================ -->
    <?php if (!empty($skills_raw)): ?>
    <section class="section skills-section-detailed">
        <div class="section-header" data-scroll-reveal>
            <h2>Stack Tecnológico</h2>
        </div>
        
        <div class="skills-grid-detailed">
            
            <?php
            $categorias = [
                'frontend' => ['titulo' => 'Frontend', 'icono' => 'fa-laptop-code'],
                'backend' => ['titulo' => 'Backend', 'icono' => 'fa-server'],
                'tools' => ['titulo' => 'Herramientas', 'icono' => 'fa-tools'],
                'other' => ['titulo' => 'Otros', 'icono' => 'fa-code-branch']
            ];
            
            foreach ($categorias as $key => $cat): 
                if (empty($skills_grouped[$key])) continue;
            ?>
            <div data-scroll-reveal>
                <h3 class="skill-category-title">
                    <i class="fas <?= $cat['icono'] ?>"></i> <?= $cat['titulo'] ?>
                </h3>
                
                <div class="skill-list">
                    <?php foreach ($skills_grouped[$key] as $skill): ?>
                        <div>
                            <div class="skill-item-header">
                                <span class="skill-item-name">
                                    <?php if (!empty($skill['icon_class'])): ?>
                                        <i class="<?= htmlspecialchars($skill['icon_class']) ?> skill-item-icon"></i>
                                    <?php endif; ?>
                                    <?= htmlspecialchars($skill['name']) ?>
                                </span>
                                <span class="skill-level-text"><?= (int)$skill['level'] ?>%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" data-level="<?= (int)$skill['level'] ?>"></div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php endforeach; ?>
            
        </div>
    </section>
    <?php endif; ?>

<?php require_once 'includes/footer.php'; ?>
