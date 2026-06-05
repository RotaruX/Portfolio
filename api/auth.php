<?php
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

$VALID_USER = 'RotaruX';
$VALID_PASS = 'Limpiacacas11.';
$TOKEN = base64_encode('RotaruX:portfolio_admin_secure_token_2026');

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
