// Auth Service - Autenticação e 2FA
import { request } from './api.service';

const isDevelopment = import.meta.env.DEV;

const devUser = {
  id: 'dev-user-123',
  username: 'DevUser',
  email: 'dev@krasnaya.local',
  avatar: '🤖',
  has2FA: false,
  role: 'admin' as const
};

export class AuthService {
  // Login com Discord OAuth
  static async login(code: string): Promise<{
    accessToken: string;
    user: { id: string; username: string; email: string; avatar: string };
  }> {
    // In development, bypass login
    if (isDevelopment) {
      return {
        accessToken: 'dev-token-' + Date.now(),
        user: devUser
      };
    }
    return request('POST', '/auth/login', { code });
  }

  // Logout
  static async logout(): Promise<void> {
    if (isDevelopment) return;
    return request('POST', '/auth/logout', {});
  }

  // Iniciar 2FA setup
  static async initiate2FA(): Promise<{
    secret: string;
    qrCode: string;
  }> {
    if (isDevelopment) {
      return {
        secret: 'dev-secret-' + Date.now(),
        qrCode: 'data:image/svg+xml,<svg></svg>'
      };
    }
    return request('POST', '/auth/2fa/setup', {});
  }

  // Confirmar 2FA com OTP
  static async confirm2FA(secret: string, otp: string): Promise<{
    success: boolean;
    backupCodes: string[];
  }> {
    if (isDevelopment) {
      return {
        success: true,
        backupCodes: Array.from({ length: 10 }, (_, i) => `DEV-CODE-${i + 1}`)
      };
    }
    return request('POST', '/auth/2fa/confirm', { secret, otp });
  }

  // Verificar OTP no login
  static async verify2FA(otp: string): Promise<{ success: boolean }> {
    if (isDevelopment) {
      return { success: true };
    }
    return request('POST', '/auth/2fa/verify', { otp });
  }

  // Desabilitar 2FA
  static async disable2FA(password: string): Promise<{ success: boolean }> {
    if (isDevelopment) {
      return { success: true };
    }
    return request('POST', '/auth/2fa/disable', { password });
  }

  // Get current user
  static async getCurrentUser(): Promise<{
    id: string;
    username: string;
    email: string;
    avatar: string;
    has2FA: boolean;
  }> {
    if (isDevelopment) {
      return devUser;
    }
    return request('GET', '/auth/me');
  }

  // Refresh token
  static async refreshToken(): Promise<{ accessToken: string }> {
    if (isDevelopment) {
      return { accessToken: 'dev-token-' + Date.now() };
    }
    return request('POST', '/auth/refresh', {});
  }
}
