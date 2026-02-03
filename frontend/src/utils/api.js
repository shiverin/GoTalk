// API configuration for GoTalk
// Automatically uses relative URLs in production (Docker) and localhost in development

const getApiBaseUrl = () => {
  // In production (Docker with nginx), use relative URLs so nginx can proxy
  // In development (Vite dev server on port 5173), use localhost:8080 directly
  if (typeof window !== 'undefined') {
    const port = window.location.port;
    // Docker serves on port 3000 or 80, Vite dev server on 5173
    if (port === "5173") {
      // Development - direct connection to backend
      return "http://localhost:8080";
    }
  }
  // Production/Docker - use relative path (nginx will proxy /api to backend)
  return "";
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to build API URLs
export const apiUrl = (path) => `${API_BASE_URL}${path}`;
