/**
 * CSRF Protection Utility
 * Generates and validates CSRF tokens for form submissions
 */

import React from 'react';
import { CSRFConfig, CSRFToken } from '../types';

class CSRFProtection {
  private static instance: CSRFProtection;
  private config: Required<CSRFConfig>;
  private tokens: Map<string, CSRFToken> = new Map();

  constructor(config: CSRFConfig = {}) {
    this.config = {
      tokenLength: config.tokenLength || 32,
      expiresIn: config.expiresIn || 3600000, // 1 hour
      headerName: config.headerName || 'X-CSRF-Token',
      paramName: config.paramName || '_csrf'
    };
  }

  static getInstance(config?: CSRFConfig): CSRFProtection {
    if (!CSRFProtection.instance) {
      CSRFProtection.instance = new CSRFProtection(config);
    }
    return CSRFProtection.instance;
  }

  /**
   * Generate a random CSRF token
   */
  private generateToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < this.config.tokenLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Create a new CSRF token
   */
  createToken(sessionId?: string): string {
    const token = this.generateToken();
    const expiresAt = Date.now() + this.config.expiresIn;
    
    // Use sessionId if provided, otherwise use a default
    const key = sessionId || 'default';
    this.tokens.set(key, { token, expiresAt });
    
    // Clean up expired tokens
    this.cleanupExpiredTokens();
    
    return token;
  }

  /**
   * Validate a CSRF token
   */
  validateToken(token: string, sessionId?: string): boolean {
    const key = sessionId || 'default';
    const stored = this.tokens.get(key);
    
    if (!stored) {
      return false;
    }
    
    // Check if token is expired
    if (Date.now() > stored.expiresAt) {
      this.tokens.delete(key);
      return false;
    }
    
    // Check if token matches
    if (stored.token !== token) {
      return false;
    }
    
    return true;
  }

  /**
   * Get current token for a session
   */
  getToken(sessionId?: string): string | null {
    const key = sessionId || 'default';
    const stored = this.tokens.get(key);
    
    if (!stored || Date.now() > stored.expiresAt) {
      return null;
    }
    
    return stored.token;
  }

  /**
   * Refresh a CSRF token
   */
  refreshToken(sessionId?: string): string {
    const key = sessionId || 'default';
    this.tokens.delete(key);
    return this.createToken(sessionId);
  }

  /**
   * Clean up expired tokens
   */
  private cleanupExpiredTokens(): void {
    const now = Date.now();
    for (const [key, value] of this.tokens.entries()) {
      if (now > value.expiresAt) {
        this.tokens.delete(key);
      }
    }
  }

  /**
   * Get CSRF header name
   */
  getHeaderName(): string {
    return this.config.headerName;
  }

  /**
   * Get CSRF parameter name
   */
  getParamName(): string {
    return this.config.paramName;
  }

  /**
   * Clear all tokens
   */
  clear(): void {
    this.tokens.clear();
  }
}

// Export singleton instance
export const csrfProtection = CSRFProtection.getInstance();

// Convenience functions
export const createCSRFToken = (sessionId?: string): string => {
  return csrfProtection.createToken(sessionId);
};

export const validateCSRFToken = (token: string, sessionId?: string): boolean => {
  return csrfProtection.validateToken(token, sessionId);
};

export const getCSRFToken = (sessionId?: string): string | null => {
  return csrfProtection.getToken(sessionId);
};

export const refreshCSRFToken = (sessionId?: string): string => {
  return csrfProtection.refreshToken(sessionId);
};

export const getCSRFHeaderName = (): string => {
  return csrfProtection.getHeaderName();
};

export const getCSRFParamName = (): string => {
  return csrfProtection.getParamName();
};

/**
 * React Hook for CSRF protection
 */
export const useCSRF = (sessionId?: string) => {
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Get or create token
    let currentToken = getCSRFToken(sessionId);
    if (!currentToken) {
      currentToken = createCSRFToken(sessionId);
    }
    setToken(currentToken);
  }, [sessionId]);

  const refreshToken = React.useCallback(() => {
    const newToken = refreshCSRFToken(sessionId);
    setToken(newToken);
    return newToken;
  }, [sessionId]);

  return {
    token,
    refreshToken,
    headerName: getCSRFHeaderName(),
    paramName: getCSRFParamName()
  };
}; 