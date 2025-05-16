const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.gridoperator.ch/v1";

export async function fetchWithError<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  get: <T>(endpoint: string) => fetchWithError<T>(`${API_BASE_URL}${endpoint}`),

  post: <T>(endpoint: string, data: any) =>
    fetchWithError<T>(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
};
