<?php
require_once 'db.php';

try {
    // 1. Obtener perfil
    $stmt = $pdo->query("SELECT * FROM profile LIMIT 1");
    $profile = $stmt->fetch();
    
    // Si no hay datos, usar valores por defecto
    if (!$profile) {
        $profile = [
            'full_name' => 'Alexandru Adrian Rotaru Alergus',
            'title' => 'Desarrollador Web (Graduado en DAW)',
            'bio' => 'Recién graduado del Grado Superior en Desarrollo de Aplicaciones Web (DAW). Soy un desarrollador apasionado por crear experiencias digitales excepcionales. Actualmente estoy estudiando más tecnologías y frameworks, y estoy dispuesto a aprender cualquier tipo de lenguaje. Mi stack principal incluye: HTML, CSS, JavaScript, PHP, MySQL, React, Node.js y Git.',
            'email' => 'rotarualex1612@gmail.com',
            'phone' => '610211872',
            'location' => 'Elche, Alicante',
            'github_url' => 'https://github.com/RotaruX',
            'linkedin_url' => 'https://www.linkedin.com/in/alexandru-adrian-rotaru-alergus/',
            'cv_url' => 'assets/docs/cv.pdf',
            'profile_image' => 'assets/img/profile.jpg'
        ];
    }

    // 2. Calcular años de experiencia
    $stmt = $pdo->query("SELECT MIN(start_date) as first_date FROM experience");
    $exp = $stmt->fetch();
    $years_exp = $exp && $exp['first_date'] 
        ? max(0, (int)floor((time() - strtotime($exp['first_date'])) / (365.25 * 24 * 3600)))
        : 0;

    // 3. Contar proyectos totales
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM projects");
    $total_projects = (int)($stmt->fetch()['total'] ?? 0);

    // 4. Contar tecnologías (skills)
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM skills");
    $total_tech = (int)($stmt->fetch()['total'] ?? 0);

    echo json_encode([
        'profile' => $profile,
        'years_exp' => $years_exp,
        'total_projects' => $total_projects,
        'total_tech' => $total_tech
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener los datos del perfil: ' . $e->getMessage()]);
}
