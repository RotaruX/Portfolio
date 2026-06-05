<?php
/**
 * Router principal - Portfolio React
 * 
 * Este archivo sirve de puente para cargar la aplicación React compilada (dist/)
 * directamente desde la raíz del servidor Apache (XAMPP).
 */

if (file_exists(__DIR__ . '/dist/index.html')) {
    $html = file_get_contents(__DIR__ . '/dist/index.html');
    
    // Reemplazar las rutas relativas compiladas por Vite para que funcionen desde la raíz
    $html = str_replace('./assets/', 'dist/assets/', $html);
    $html = str_replace('./favicon.', 'dist/favicon.', $html);
    
    echo $html;
} else {
    // Mensaje si aún no se ha compilado
    echo '<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio React - Configuración</title>
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
            h1 {
                color: #00ff88;
                font-size: 1.8rem;
                margin-bottom: 1rem;
            }
            p {
                color: #6b9e7a;
                line-height: 1.6;
                margin-bottom: 1.5rem;
            }
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
            <h1>🚀 Portfolio Migrado a React + Vite</h1>
            <p>La estructura del portafolio se ha migrado a React con éxito.</p>
            <p>Para ver el sitio en producción a través de XAMPP, ejecuta el siguiente comando en la terminal para compilar el frontend:</p>
            <p><code>npm run build</code></p>
            <p>Para el desarrollo en tiempo real, puedes iniciar el servidor de desarrollo de Vite con:</p>
            <p><code>npm run dev</code></p>
        </div>
    </body>
    </html>';
}
