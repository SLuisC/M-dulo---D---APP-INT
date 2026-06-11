import { apiRequest } from './api';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  roles: string[];
  permissions: string[];
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
  user: AuthUser;
}

export async function login(usernameOrEmail: string, password: string) {
  const response = await apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ usernameOrEmail, password }),
  });
  localStorage.setItem('accessToken', response.accessToken);
  localStorage.setItem('authUser', JSON.stringify(response.user));
  return response;
}

export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('authUser');
  window.location.href = '/login';
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('authUser');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function hasPermission(user: AuthUser | null, permission?: string) {
  if (!permission) return true;
  return Boolean(user?.permissions.includes(permission));
}
