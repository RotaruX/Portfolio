<?php
require_once 'db.php';

try {
    $stmt = $pdo->query("SELECT * FROM skills ORDER BY level DESC");
    $skills = $stmt->fetchAll();
    
    $grouped = [
        'frontend' => [],
        'backend' => [],
        'tools' => [],
        'other' => []
    ];
    
    foreach ($skills as $skill) {
        $category = $skill['category'] ?? 'other';
        if (array_key_exists($category, $grouped)) {
            $grouped[$category][] = $skill;
        } else {
            $grouped['other'][] = $skill;
        }
    }
    
    echo json_encode([
        'skills' => $skills,
        'grouped' => $grouped
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener las habilidades: ' . $e->getMessage()]);
}
