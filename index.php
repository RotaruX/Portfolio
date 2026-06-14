<?php
/**
 * Router principal - Portfolio React (Producción / Arsys)
 * 
 * Sirve la aplicación React compilada desde dist/.
 * Reescribe las rutas de assets para que funcionen desde la raíz del dominio.
 */

if (file_exists(__DIR__ . '/dist/index.html')) {
    $html = file_get_contents(__DIR__ . '/dist/index.html');
    
    // Reemplazar rutas relativas de Vite por rutas absolutas que apunten a /dist/
    // Vite genera: ./assets/  → Convertir a: /dist/assets/
    $html = str_replace('src="./assets/', 'src="/dist/assets/', $html);
    $html = str_replace('href="./assets/', 'href="/dist/assets/', $html);
    $html = str_replace('./favicon.', '/dist/favicon.', $html);
    
    echo $html;
} else {
    // Mensaje si aún no se ha compilado
    http_response_code(503);
    echo '<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio - En mantenimiento</title>
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
            .container {
                text-align: center;
                padding: 2.5rem;
                border: 1px solid rgba(0, 255, 136, 0.1);
                border-radius: 12px;
                background-color: #0f2318;
                max-width: 550px;
                box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
            }
            h1 { color: #00ff88; font-size: 1.8rem; margin-bottom: 1rem; }
            p { color: #6b9e7a; line-height: 1.6; margin-bottom: 1.5rem; }
            code {
                background-color: #132e1c;
                padding: 4px 8px;
                border-radius: 4px;
                color: #00ff88;
                font-family: monospace;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🔧 Sitio en mantenimiento</h1>
            <p>El build de producción no se ha encontrado.</p>
            <p>Ejecuta <code>npm run build</code> y sube la carpeta <code>dist/</code> al servidor.</p>
        </div>
    </body>
    </html>';
}
