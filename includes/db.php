<?php
/**
 * Conexión a la Base de Datos - Portfolio
 * 
 * Establece la conexión PDO a MySQL con configuración
 * de seguridad y codificación UTF8MB4.
 * 
 * @var PDO $pdo - Objeto de conexión a la base de datos
 */

// Configuración de la base de datos
$db_host = 'localhost';
$db_name = 'portfolio_db';
$db_user = 'root';
$db_pass = '';
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
    // Manejo limpio de errores de conexión
    // En producción, registrar el error en un log y mostrar un mensaje genérico
    error_log('Error de conexión a la base de datos: ' . $e->getMessage());
    
    // Mostrar mensaje amigable al usuario
    http_response_code(503);
    echo '<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error de Conexión</title>
        <style>
            body {
                font-family: "Inter", sans-serif;
                background-color: #0a1a0f;
                color: #e0f2e8;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
            }
            .error-container {
                text-align: center;
                padding: 2rem;
                border: 1px solid rgba(0, 255, 136, 0.1);
                border-radius: 12px;
                background-color: #0f2318;
                max-width: 500px;
            }
            .error-container h1 {
                color: #00ff88;
                font-size: 1.5rem;
            }
            .error-container p {
                color: #6b9e7a;
                line-height: 1.6;
            }
        </style>
    </head>
    <body>
        <div class="error-container">
            <h1>⚠️ Error de Conexión</h1>
            <p>No se pudo conectar a la base de datos. Por favor, verifica que el servidor MySQL esté activo y la base de datos esté configurada correctamente.</p>
        </div>
    </body>
    </html>';
    exit;
}
