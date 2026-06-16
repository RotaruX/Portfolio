<?php
/**
 * Cargador simple de variables de entorno para PHP
 * Lee el archivo .env en la raíz del proyecto si existe
 */

function loadEnv($path) {
    if (!file_exists($path)) {
        return false;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Ignorar comentarios
        $line = trim($line);
        if (empty($line) || strpos($line, '#') === 0) {
            continue;
        }

        // Dividir por el primer signo igual
        $parts = explode('=', $line, 2);
        if (count($parts) !== 2) {
            continue;
        }

        $name = trim($parts[0]);
        $value = trim($parts[1]);

        // Quitar comillas simples o dobles de los extremos si existen
        if (preg_match('/^"(.*)"$/', $value, $matches)) {
            $value = $matches[1];
        } elseif (preg_match("/^'(.*)'$/", $value, $matches)) {
            $value = $matches[1];
        }

        // Definir la variable de entorno si no existe ya en el servidor
        // (El archivo .env tiene prioridad en desarrollo)
        putenv("{$name}={$value}");
        $_ENV[$name] = $value;
        $_SERVER[$name] = $value;
    }
    return true;
}

// Cargar automáticamente desde la raíz del proyecto (un directorio por encima de /api)
// Detección inteligente de entorno (Local vs Producción) para evitar cargar credenciales de desarrollo en Arsys.
$isLocalhost = false;
if (isset($_SERVER['HTTP_HOST'])) {
    $host = $_SERVER['HTTP_HOST'];
    if ($host === 'localhost' || $host === '127.0.0.1' || preg_match('/^192\.168\./', $host) || preg_match('/^10\./', $host)) {
        $isLocalhost = true;
    }
} else {
    // Si se ejecuta desde CLI, asumimos local
    $isLocalhost = true;
}

if ($isLocalhost) {
    // En desarrollo local: Prioridad al archivo .env local
    $envLoaded = loadEnv(__DIR__ . '/../.env');
    if (!$envLoaded) {
        loadEnv(__DIR__ . '/../.env.production');
    }
} else {
    // En producción (Arsys):
    // Si el usuario subió su .env de desarrollo local por error, lo detectamos y usamos .env.production.
    $useProductionFile = true;
    $dotEnvPath = __DIR__ . '/../.env';
    
    if (file_exists($dotEnvPath)) {
        $content = @file_get_contents($dotEnvPath);
        if ($content !== false && strpos($content, 'DB_HOST=localhost') !== false && strpos($content, 'DB_USER=root') !== false) {
            // Es el .env local de XAMPP subido por error
            $useProductionFile = true;
        } else {
            // Es un .env configurado específicamente para producción
            $useProductionFile = false;
        }
    }
    
    if ($useProductionFile) {
        loadEnv(__DIR__ . '/../.env.production');
    } else {
        loadEnv($dotEnvPath);
    }
}
