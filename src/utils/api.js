/**
 * Utilidad para resolver las URLs de la API de forma dinámica.
 * Funciona sin problemas tanto en desarrollo local (Vite/XAMPP) como en producción (Arsys).
 */
export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

  // 1. Comprobar si estamos en localhost
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const origin = window.location.origin;

  // 2. Si estamos en producción, usar el dominio de producción dinámicamente
  if (!isLocalhost) {
    return `${origin}/${cleanEndpoint}`;
  }

  // 3. Si es local, usar la variable de entorno configurada, o por defecto /Portfolio
  const envUrl = import.meta.env.VITE_API_URL;
  const base = envUrl ? (envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl) : `${origin}/Portfolio`;
  
  return `${base}/${cleanEndpoint}`;
};
