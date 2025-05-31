// lib/api.ts

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * Only for development: Reads Basic Auth credentials from env
 * Never use this in production!
 */
function getAuthHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const user = process.env.NEXT_PUBLIC_API_USER;
  const password = process.env.NEXT_PUBLIC_API_PASSWORD;

  if (!user || !password) return {};

  const token = btoa(`${user}:${password}`);
  return { Authorization: `Basic ${token}` };
}

async function fetchWithError<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const mergedOptions: RequestInit = {
    ...options,
    credentials: "include", // ensures cookies/sessions are sent
    headers: {
      ...(options.headers || {}),
      ...getAuthHeader(),
    },
  };

  const response = await fetch(url, mergedOptions);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText}`);
  }

  return response.json();
}

export const api = {
  get: async <T>(endpoint: string): Promise<T> =>
    fetchWithError<T>(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
    }),

  post: async <T>(endpoint: string, data: any): Promise<T> =>
    fetchWithError<T>(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  put: async <T>(endpoint: string, data: any): Promise<T> =>
    fetchWithError<T>(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  delete: async <T>(endpoint: string): Promise<T> =>
    fetchWithError<T>(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
    }),
};
