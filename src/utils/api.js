/**
 * Utility to resolve API URLs dynamically.
 * Works seamlessly across local development (Vite/XAMPP) and production (Arsys).
 */
export const getApiUrl = (endpoint) => {
  // 1. Use the environment variable VITE_API_URL if configured
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    const base = envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${base}/${cleanEndpoint}`;
  }

  // 2. Fallback to automatic detection based on host
  const isLocalhost = window.location.hostname === 'localhost';
  const origin = window.location.origin;
  
  // If local XAMPP/Apache is running, it usually has the project in /Portfolio
  const base = isLocalhost ? `${origin}/Portfolio` : origin;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  return `${base}/${cleanEndpoint}`;
};
