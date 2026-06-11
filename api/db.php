<?php
// Cargar variables de entorno
require_once 'env.php';

// Permitir solicitudes CORS desde cualquier origen (para desarrollo)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Si es una solicitud OPTIONS (preflight), terminar inmediatamente
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Configuración de la base de datos usando variables de entorno o valores por defecto locales
$db_host = getenv('DB_HOST') ?: 'localhost';
$db_name = getenv('DB_NAME') ?: 'portfolio_db';
$db_user = getenv('DB_USER') ?: 'root';
$db_pass = getenv('DB_PASS') !== false ? getenv('DB_PASS') : '';
$db_charset = 'utf8mb4';

// DSN (Data Source Name) para la conexión PDO
$dsn = "mysql:host={$db_host};dbname={$db_name};charset={$db_charset}";

// Opciones de configuración de PDO
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,    // Lanzar excepciones en errores
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,          // Devolver arrays asociativos
    PDO::ATTR_EMULATE_PREPARES   => false,                      // Usar prepared statements nativos
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES {$db_charset}",  // Forzar charset en conexión
];

try {
    // Crear la conexión PDO
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
} catch (PDOException $e) {
    error_log('Error de conexión a la base de datos: ' . $e->getMessage());
    
    // Devolver JSON de error
    http_response_code(503);
    echo json_encode([
        'error' => 'No se pudo conectar a la base de datos. Por favor, verifica que el servidor MySQL esté activo.'
    ]);
    exit;
}
