<?php
require_once 'db.php';

try {
    $stmt = $pdo->query("SELECT * FROM experience ORDER BY start_date DESC");
    $experience = $stmt->fetchAll();
    
    echo json_encode([
        'experience' => $experience
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener la experiencia: ' . $e->getMessage()]);
}
