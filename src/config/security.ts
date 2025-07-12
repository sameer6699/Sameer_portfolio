/**
 * Security Configuration
 * Centralized security settings and validation functions
 */

import { SecurityConfig } from '../types';

/**
 * Default security configuration
 */
export const defaultSecurityConfig: SecurityConfig = {
  csrf: {
    tokenLength: 32,
    expiresIn: 3600000, // 1 hour
    headerName: 'X-CSRF-Token',
    paramName: '_csrf'
  },
  
  storage: {
    encryptionKey: 'portfolio_secure_key_2024',
    prefix: 'secure_',
    defaultExpiration: 24 * 60 * 60 * 1000 // 24 hours
  },
  
  api: {
    timeout: 10000,
    retries: 3,
    retryDelay: 1000,
    maxPayloadSize: 1024 * 1024 // 1MB
  },
  
  csp: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'", "https:"],
    fontSrc: ["'self'", "https:"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"]
  }
};

/**
 * Environment variable validation
 */
export const validateEnvironment = (): void => {
  const requiredVars = ['VITE_BACKEND_URL'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0 && !import.meta.env.DEV) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
};

/**
 * Input sanitization functions
 */
export const sanitizeInput = {
  /**
   * Sanitize string input
   */
  string(input: string): string {
    if (typeof input !== 'string') return '';
    
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  },
  
  /**
   * Sanitize email input
   */
  email(input: string): string {
    const sanitized = this.string(input);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(sanitized) ? sanitized : '';
  },
  
  /**
   * Sanitize object input
   */
  object<T extends Record<string, unknown>>(obj: T): T {
    const sanitized: Record<string, unknown> = {};
    
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        sanitized[key] = this.string(value);
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.object(value as Record<string, unknown>);
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized as T;
  }
};

/**
 * Rate limiting configuration
 */
export const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
};

/**
 * Security headers configuration
 */
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

/**
 * Content Security Policy builder
 */
export const buildCSP = (config: SecurityConfig['csp'] = defaultSecurityConfig.csp): string => {
  const directives = [
    `default-src ${config.defaultSrc.join(' ')}`,
    `script-src ${config.scriptSrc.join(' ')}`,
    `style-src ${config.styleSrc.join(' ')}`,
    `img-src ${config.imgSrc.join(' ')}`,
    `connect-src ${config.connectSrc.join(' ')}`,
    `font-src ${config.fontSrc.join(' ')}`,
    `object-src ${config.objectSrc.join(' ')}`,
    `media-src ${config.mediaSrc.join(' ')}`,
    `frame-src ${config.frameSrc.join(' ')}`,
  ];
  
  return directives.join('; ');
};

/**
 * Validate URL format
 */
export const validateURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Generate secure random string
 */
export const generateSecureRandom = (length: number = 32): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(array[i] % chars.length);
  }
  
  return result;
};

/**
 * Hash sensitive data (simple implementation)
 * In production, use proper hashing libraries
 */
export const hashData = async (data: string): Promise<string> => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Security validation utilities
 */
export const securityValidation = {
  /**
   * Validate CSRF token format
   */
  csrfToken(token: string): boolean {
    return typeof token === 'string' && token.length >= 32 && /^[A-Za-z0-9]+$/.test(token);
  },
  
  /**
   * Validate session ID format
   */
  sessionId(sessionId: string): boolean {
    return typeof sessionId === 'string' && sessionId.length > 0 && /^[a-zA-Z0-9-_]+$/.test(sessionId);
  },
  
  /**
   * Validate API payload size
   */
  payloadSize(payload: unknown): boolean {
    const size = JSON.stringify(payload).length;
    return size <= defaultSecurityConfig.api.maxPayloadSize;
  }
}; 