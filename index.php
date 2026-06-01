<?php
/**
 * Página de Inicio - Bienvenida
 * 
 * Landing page principal del portfolio con secciones:
 * Hero, Sobre Mí, Habilidades, Proyectos Destacados y CTA
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

// Obtener proyectos destacados
try {
    $stmt = $pdo->query("SELECT * FROM projects WHERE featured = 1 ORDER BY created_at DESC LIMIT 3");
    $featured_projects = $stmt->fetchAll();
} catch (PDOException $e) {
    $featured_projects = [];
}

// Obtener habilidades
try {
    $stmt = $pdo->query("SELECT * FROM skills ORDER BY level DESC");
    $skills = $stmt->fetchAll();
} catch (PDOException $e) {
    $skills = [];
}

// Obtener experiencia para calcular años
try {
    $stmt = $pdo->query("SELECT MIN(start_date) as first_date FROM experience");
    $exp = $stmt->fetch();
    $years_exp = $exp && $exp['first_date'] 
        ? max(0, floor((time() - strtotime($exp['first_date'])) / (365.25 * 24 * 3600)))
        : 0;
} catch (PDOException $e) {
    $years_exp = 0;
}

// Contar proyectos totales
try {
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM projects");
    $total_projects = $stmt->fetch()['total'];
} catch (PDOException $e) {
    $total_projects = 6;
}

// Contar tecnologías únicas
$total_tech = count($skills);

// Datos por defecto si no hay perfil
$name = $profile['full_name'] ?? 'Alexandru Adrian Rotaru Alergus';
$title = $profile['title'] ?? 'Desarrollador Web (Graduado en DAW)';
$bio = $profile['bio'] ?? 'Recién graduado del Grado Superior en Desarrollo de Aplicaciones Web (DAW). Soy un desarrollador apasionado por crear experiencias digitales excepcionales. Actualmente estoy estudiando más tecnologías y frameworks, y estoy dispuesto a aprender cualquier tipo de lenguaje.';
$email = $profile['email'] ?? 'rotarualex1612@gmail.com';
$location = $profile['location'] ?? 'Elche, Alicante';
$github = $profile['github_url'] ?? '#';
$linkedin = $profile['linkedin_url'] ?? '#';

// Bio corta para el hero (primeras 200 chars)
$short_bio = mb_strlen($bio) > 200 ? mb_substr($bio, 0, 200) . '...' : $bio;

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
    <!-- HERO SECTION                                 -->
    <!-- ============================================ -->
    <section id="hero" class="hero-section">
        <canvas id="particles-canvas"></canvas>
        
        <div class="hero-wrapper">
            <!-- Contenido principal del Hero -->
            <div class="hero-content">
                <p class="hero-greeting">
                    <span class="greeting-prefix">&gt;</span> Hola, mi nombre es
                </p>
                
                <h1><?= htmlspecialchars($name) ?></h1>
                
                <div class="typewriter-container">
                    <span class="typewriter-prefix">&gt;</span> 
                    <span id="typewriter"></span><span class="cursor">|</span>
                </div>
                
                <p class="hero-bio"><?= htmlspecialchars($short_bio) ?></p>
                
                <div class="hero-buttons">
                    <a href="projects.php" class="btn btn-primary">
                        <i class="fas fa-rocket"></i> Ver Proyectos
                    </a>
                    <a href="mailto:<?= htmlspecialchars($email) ?>" class="btn btn-outline">
                        <i class="fas fa-envelope"></i> Contactar
                    </a>
                </div>
            </div>
            
            <!-- Bloque de código decorativo -->
            <div class="hero-code-block">
                <div class="window-dots">
                    <span></span><span></span><span></span>
                </div>
                <div class="code-content">
                    <span class="code-comment">// sobre_mi.json</span><br>
                    <span class="code-bracket">{</span><br>
                    &nbsp;&nbsp;<span class="code-key">"nombre"</span>: <span class="code-string">"<?= htmlspecialchars($name) ?>"</span>,<br>
                    &nbsp;&nbsp;<span class="code-key">"rol"</span>: <span class="code-string">"Full Stack Developer"</span>,<br>
                    &nbsp;&nbsp;<span class="code-key">"experiencia"</span>: <span class="code-value">"<?= $years_exp ?>+ años"</span>,<br>
                    &nbsp;&nbsp;<span class="code-key">"pasión"</span>: <span class="code-string">"Crear soluciones digitales"</span>,<br>
                    &nbsp;&nbsp;<span class="code-key">"disponible"</span>: <span class="code-value">true</span><br>
                    <span class="code-bracket">}</span>
                </div>
            </div>
        </div>
    </section>

    <!-- ============================================ -->
    <!-- SOBRE MÍ                                     -->
    <!-- ============================================ -->
    <section id="about" class="section about-section" data-scroll-reveal>
        <div class="section-header">
            <h2><span class="section-number">01.</span> Sobre Mí</h2>
        </div>
        
        <div class="about-grid">
            <!-- Imagen de perfil -->
            <div class="about-image-wrapper">
                <div class="about-image-inner">
                    <?php if ($profile && !empty($profile['profile_image']) && file_exists($profile['profile_image'])): ?>
                        <img src="<?= htmlspecialchars($profile['profile_image']) ?>" alt="Foto de <?= htmlspecialchars($name) ?>">
                    <?php else: ?>
                        <span class="about-image-placeholder"><?= $initials ?></span>
                    <?php endif; ?>
                </div>
            </div>
            
            <!-- Texto sobre mí -->
            <div class="about-text">
                <p><?= nl2br(htmlspecialchars($bio)) ?></p>
                
                <div class="about-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <?= htmlspecialchars($location) ?>
                </div>
                
                <!-- Estadísticas animadas -->
                <div class="about-stats">
                    <div class="stat-item">
                        <div class="stat-number" data-count="<?= $years_exp ?>" data-suffix="+">0</div>
                        <div class="stat-label">Años de Experiencia</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" data-count="<?= $total_projects ?>" data-suffix="+">0</div>
                        <div class="stat-label">Proyectos Completados</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" data-count="<?= $total_tech ?>" data-suffix="+">0</div>
                        <div class="stat-label">Tecnologías</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ============================================ -->
    <!-- HABILIDADES                                  -->
    <!-- ============================================ -->
    <?php if (!empty($skills)): ?>
    <section id="skills" class="section skills-section" data-scroll-reveal>
        <div class="section-header">
            <h2><span class="section-number">02.</span> Habilidades</h2>
            <p class="section-subtitle">Tecnologías y herramientas con las que trabajo día a día</p>
        </div>
        
        <div class="skills-grid">
            <?php foreach ($skills as $skill): ?>
                <div class="skill-card">
                    <div class="skill-card-header">
                        <i class="<?= htmlspecialchars($skill['icon_class']) ?>"></i>
                        <span class="skill-level"><?= (int)$skill['level'] ?>%</span>
                    </div>
                    <div class="skill-name"><?= htmlspecialchars($skill['name']) ?></div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-level="<?= (int)$skill['level'] ?>"></div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </section>
    <?php endif; ?>

    <!-- ============================================ -->
    <!-- PROYECTOS DESTACADOS                         -->
    <!-- ============================================ -->
    <?php if (!empty($featured_projects)): ?>
    <section id="featured-projects" class="section projects-section" data-scroll-reveal>
        <div class="section-header">
            <h2><span class="section-number">03.</span> Proyectos Destacados</h2>
            <p class="section-subtitle">Una selección de mis trabajos más recientes y relevantes</p>
        </div>
        
        <div class="projects-grid">
            <?php foreach ($featured_projects as $project): ?>
                <article class="project-card">
                    <div class="project-image">
                        <?php if (!empty($project['image_url']) && file_exists($project['image_url'])): ?>
                            <img src="<?= htmlspecialchars($project['image_url']) ?>" 
                                 alt="<?= htmlspecialchars($project['title']) ?>">
                        <?php else: ?>
                            <div class="project-image-placeholder">
                                <i class="fas fa-<?= $project['category'] === 'web' ? 'globe' : ($project['category'] === 'app' ? 'mobile-alt' : 'terminal') ?>"></i>
                            </div>
                        <?php endif; ?>
                        <span class="project-category"><?= htmlspecialchars($project['category']) ?></span>
                    </div>
                    
                    <div class="project-content">
                        <h3><?= htmlspecialchars($project['title']) ?></h3>
                        <p><?= htmlspecialchars(mb_strlen($project['description']) > 150 
                            ? mb_substr($project['description'], 0, 150) . '...' 
                            : $project['description']) ?></p>
                        
                        <!-- Tecnologías -->
                        <div class="project-tech">
                            <?php 
                            $techs = explode(',', $project['technologies']);
                            foreach ($techs as $tech): 
                                $tech = trim($tech);
                                if (!empty($tech)):
                            ?>
                                <span class="tech-badge"><?= htmlspecialchars($tech) ?></span>
                            <?php 
                                endif;
                            endforeach; 
                            ?>
                        </div>
                        
                        <!-- Enlaces del proyecto -->
                        <div class="project-links">
                            <?php if (!empty($project['project_url'])): ?>
                                <a href="<?= htmlspecialchars($project['project_url']) ?>" target="_blank" rel="noopener noreferrer">
                                    <i class="fas fa-external-link-alt"></i> Demo
                                </a>
                            <?php endif; ?>
                            <?php if (!empty($project['github_url'])): ?>
                                <a href="<?= htmlspecialchars($project['github_url']) ?>" target="_blank" rel="noopener noreferrer">
                                    <i class="fab fa-github"></i> Código
                                </a>
                            <?php endif; ?>
                        </div>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
        
        <div class="view-all-link">
            <a href="projects.php">
                Ver todos los proyectos <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </section>
    <?php endif; ?>

    <!-- ============================================ -->
    <!-- SECCIÓN CTA (Llamada a la acción)            -->
    <!-- ============================================ -->
    <section id="contact-cta" class="cta-section" data-scroll-reveal>
        <div class="cta-card">
            <h2>¿Interesado en trabajar juntos?</h2>
            <p>
                Estoy buscando nuevas oportunidades como desarrollador. 
                Si tienes un proyecto interesante o una posición abierta, 
                ¡me encantaría escucharte!
            </p>
            <a href="mailto:<?= htmlspecialchars($email) ?>" class="btn btn-primary btn-lg">
                <i class="fas fa-paper-plane"></i> Enviar Mensaje
            </a>
        </div>
    </section>

<?php require_once 'includes/footer.php'; ?>
