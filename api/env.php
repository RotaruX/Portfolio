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
loadEnv(__DIR__ . '/../.env');
