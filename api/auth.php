<?php
// Cargar variables de entorno
require_once 'env.php';

// Permitir CORS para desarrollo
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"));

$username = $data->username ?? '';
$password = $data->password ?? '';

// Cargar credenciales desde variables de entorno o usar valores locales predeterminados
$VALID_USER = getenv('ADMIN_USER') ?: 'RotaruX';
$VALID_PASS = getenv('ADMIN_PASS') ?: 'Limpiacacas11.';
$TOKEN_SECRET = getenv('ADMIN_TOKEN_SECRET') ?: 'portfolio_admin_secure_token_2026';
$TOKEN = base64_encode($VALID_USER . ':' . $TOKEN_SECRET);

if ($username === $VALID_USER && $password === $VALID_PASS) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'token' => $TOKEN,
        'user' => [
            'username' => $username
        ]
    ]);
} else {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Credenciales incorrectas']);
}
