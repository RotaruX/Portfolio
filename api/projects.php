<?php
require_once 'db.php';

try {
    $featured = isset($_GET['featured']) && $_GET['featured'] == '1';
    
    if ($featured) {
        $stmt = $pdo->query("SELECT * FROM projects WHERE featured = 1 ORDER BY created_at DESC LIMIT 3");
    } else {
        $stmt = $pdo->query("SELECT * FROM projects ORDER BY created_at DESC");
    }
    
    $projects = $stmt->fetchAll();
    
    echo json_encode([
        'projects' => $projects
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener los proyectos: ' . $e->getMessage()]);
}
