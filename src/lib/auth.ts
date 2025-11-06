export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

export function clearAuthToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
}
