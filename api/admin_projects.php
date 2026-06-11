<?php
require_once 'db.php';

// Manejo de CORS manual ya está en db.php, pero añadimos soporte para DELETE/PUT
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");

// Verificar Autenticación (Token)
function checkAuth() {
    $headers = apache_request_headers();
    $authHeader = $headers['Authorization'] ?? '';
    
    $validUser = getenv('ADMIN_USER') ?: 'RotaruX';
    $tokenSecret = getenv('ADMIN_TOKEN_SECRET') ?: 'portfolio_admin_secure_token_2026';
    $expectedToken = 'Bearer ' . base64_encode($validUser . ':' . $tokenSecret);
    
    if ($authHeader !== $expectedToken) {
        http_response_code(401);
        echo json_encode(['error' => 'No autorizado']);
        exit;
    }
}

$method = $_SERVER['REQUEST_METHOD'];

// Para GET, solo leemos, podemos requerir o no token. Requeriremos token por seguridad admin.
if ($method === 'GET') {
    checkAuth();
    if (isset($_GET['id'])) {
        $stmt = $pdo->prepare("SELECT * FROM projects WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        echo json_encode($stmt->fetch());
    } else {
        $stmt = $pdo->query("SELECT * FROM projects ORDER BY created_at DESC");
        echo json_encode(['projects' => $stmt->fetchAll()]);
    }
    exit;
}

if ($method === 'DELETE') {
    checkAuth();
    $id = $_GET['id'] ?? null;
    if ($id) {
        $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'ID no proporcionado']);
    }
    exit;
}

// POST: Crear o Actualizar (usamos POST para ambos por la subida de archivos)
if ($method === 'POST') {
    checkAuth();
    
    $id = $_POST['id'] ?? null;
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $technologies = $_POST['technologies'] ?? '';
    $project_url = $_POST['project_url'] ?? '';
    $github_url = $_POST['github_url'] ?? '';
    $category = $_POST['category'] ?? 'web';
    $featured = isset($_POST['featured']) && $_POST['featured'] === 'true' ? 1 : 0;
    
    $image_url = $_POST['existing_image_url'] ?? ''; // si se pasa la imagen existente

    // Manejar subida de archivo
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../assets/img/projects/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        $filename = time() . '_' . basename($_FILES['image']['name']);
        $targetPath = $uploadDir . $filename;
        
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
            $image_url = 'assets/img/projects/' . $filename;
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Error al guardar la imagen. Verifica los permisos de carpeta.']);
            exit;
        }
    }

    if ($id) {
        // Update
        $stmt = $pdo->prepare("UPDATE projects SET title=?, description=?, technologies=?, project_url=?, github_url=?, category=?, featured=?, image_url=? WHERE id=?");
        $stmt->execute([$title, $description, $technologies, $project_url, $github_url, $category, $featured, $image_url, $id]);
        echo json_encode(['success' => true, 'message' => 'Proyecto actualizado']);
    } else {
        // Insert
        $stmt = $pdo->prepare("INSERT INTO projects (title, description, technologies, project_url, github_url, category, featured, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$title, $description, $technologies, $project_url, $github_url, $category, $featured, $image_url]);
        echo json_encode(['success' => true, 'message' => 'Proyecto creado', 'id' => $pdo->lastInsertId()]);
    }
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Método no permitido']);
