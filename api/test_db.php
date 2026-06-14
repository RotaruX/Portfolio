<?php
// Script de diagnóstico para la conexión a base de datos
header("Content-Type: text/plain; charset=UTF-8");

echo "=== DIAGNÓSTICO DE CONEXIÓN A BASE DE DATOS ===" . PHP_EOL;

// 1. Verificar carga de variables de entorno
require_once 'env.php';

echo "Variables de entorno cargadas:" . PHP_EOL;
echo "DB_HOST: " . (getenv('DB_HOST') ?: 'No definido (usando valor por defecto)') . PHP_EOL;
echo "DB_NAME: " . (getenv('DB_NAME') ?: 'No definido (usando valor por defecto)') . PHP_EOL;
echo "DB_USER: " . (getenv('DB_USER') ?: 'No definido (usando valor por defecto)') . PHP_EOL;
echo "DB_PASS: " . (getenv('DB_PASS') !== false ? 'Definido (ocultado por seguridad)' : 'No definido') . PHP_EOL;

// 2. Intentar conexión
$db_host = getenv('DB_HOST') ?: 'localhost';
$db_name = getenv('DB_NAME') ?: 'qaqu742';
$db_user = getenv('DB_USER') ?: 'qaqu742';
$db_pass = getenv('DB_PASS') !== false ? getenv('DB_PASS') : 'Limpiacacas11.';
$db_charset = 'utf8mb4';

$dsn = "mysql:host={$db_host};dbname={$db_name};charset={$db_charset}";
echo PHP_EOL . "Intentando conectar con DSN: mysql:host={$db_host};dbname={$db_name}" . PHP_EOL;

try {
    $pdo = new PDO($dsn, $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_TIMEOUT => 5 // Timeout rápido para no colgar
    ]);
    echo "✅ ¡CONEXIÓN EXITOSA A LA BASE DE DATOS!" . PHP_EOL;
    
    // Probar consulta rápida
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo "Tablas encontradas en la base de datos:" . PHP_EOL;
    if (empty($tables)) {
        echo "   (Ninguna tabla encontrada. ¡Recuerda ejecutar el archivo .sql!)" . PHP_EOL;
    } else {
        foreach ($tables as $table) {
            echo "   - " . $table . PHP_EOL;
        }
    }
} catch (PDOException $e) {
    echo "❌ ERROR DE CONEXIÓN: " . $e->getMessage() . PHP_EOL;
    echo "Código de error: " . $e->getCode() . PHP_EOL;
}
