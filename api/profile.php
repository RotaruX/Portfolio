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
            'title' => 'Desarrollador Backend Java | Spring Boot',
            'bio' => 'Desarrollador backend en formación con base sólida en Java y Spring Boot. Graduado del Grado Superior en Desarrollo de Aplicaciones Web (DAW) y con formación adicional en Sistemas de Telecomunicaciones e Informáticos. He desarrollado APIs REST con Spring Boot y Spring Security, gestionando persistencia con SQL y contenerización con Docker. Persona responsable, adaptable y con gran capacidad de aprendizaje. Busco incorporarme a una empresa, preferiblemente en remoto, para crecer como desarrollador Java aportando compromiso y ganas de asumir nuevos retos técnicos.',
            'email' => 'rotarualex1612@gmail.com',
            'phone' => '610211872',
            'location' => 'Elche, Alicante',
            'github_url' => 'https://github.com/RotaruX',
            'linkedin_url' => 'https://www.linkedin.com/in/alexandru-adrian-rotaru-alergus/',
            'cv_url' => 'assets/docs/cv.pdf',
            'profile_image' => 'assets/img/profile.jpg'
        ];
    }

    // 2. Calcular años de experiencia (solo sector IT/desarrollo)
    $stmt = $pdo->query("SELECT MIN(start_date) as first_date FROM experience WHERE position LIKE '%Desarrollador%' OR position LIKE '%Técnico%' OR position LIKE '%Programador%'");
    $exp = $stmt->fetch();
    $years_exp = $exp && $exp['first_date'] 
        ? max(1, (int)ceil((time() - strtotime($exp['first_date'])) / (365.25 * 24 * 3600)))
        : 1;

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
