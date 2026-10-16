/**
 * Central API Client Configuration for LarasRasa.
 * 
 * Prepares the frontend for future Laravel backend integration.
 * In development / mock mode, requests fallback to structured local data fixtures.
 */

export const API_CONFIG = {
  baseUrl: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) || '/api',
  useMock: typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_USE_MOCK !== 'false' : true,
  timeoutMs: 8000
};

/**
 * Standard HTTP Request Wrapper for future Laravel REST API endpoints.
 * Handles timeouts, structured JSON parsing, and Laravel validation error envelopes.
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_CONFIG.baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...options.headers
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const error = new Error(data?.message || `HTTP ${response.status}: Permintaan gagal`);
      error.status = response.status;
      error.errors = data?.errors || null;
      throw error;
    }

    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Koneksi waktu habis (timeout). Silakan periksa jaringan Anda.');
    }
    throw err;
  }
}

