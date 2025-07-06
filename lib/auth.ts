// Authentication utilities

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

export const setAuthToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
}

export const removeAuthToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
}

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  return !!token;
}

export const getAuthHeaders = (): Record<string, string> => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

export const handleAuthError = (router: any): void => {
  console.log('Authentication failed, clearing token and redirecting');
  removeAuthToken();
  router.push('/auth/login');
}

// Utility function to make authenticated API calls
export const authenticatedFetch = async (
  url: string, 
  options: RequestInit = {},
  router?: any
): Promise<Response> => {
  const headers = {
    ...getAuthHeaders(),
    ...options.headers
  };

  console.log('Making authenticated request to:', url);
  console.log('Headers:', headers);

  const response = await fetch(url, {
    ...options,
    headers
  });

  console.log('Response status:', response.status);

  // Handle authentication errors
  if (response.status === 401 && router) {
    handleAuthError(router);
    throw new Error('Authentication failed');
  }

  return response;
} 