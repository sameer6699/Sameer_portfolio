/**
 * Secure Storage Utility
 * Provides encrypted localStorage with validation and sanitization
 */

import { StorageData } from '../types';

// Simple encryption key (in production, this should be more sophisticated)
const ENCRYPTION_KEY = 'portfolio_secure_key_2024';

/**
 * Simple encryption/decryption functions
 * In production, use a proper encryption library like crypto-js
 */
const encrypt = (text: string): string => {
  try {
    // Simple XOR encryption (replace with proper encryption in production)
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length));
    }
    return btoa(result); // Base64 encode
  } catch (error) {
    console.error('Encryption failed:', error);
    return '';
  }
};

const decrypt = (encryptedText: string): string => {
  try {
    const decoded = atob(encryptedText); // Base64 decode
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      result += String.fromCharCode(decoded.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length));
    }
    return result;
  } catch (error) {
    console.error('Decryption failed:', error);
    return '';
  }
};

/**
 * Validate and sanitize data before storage
 */
const validateData = (data: unknown): boolean => {
  if (data === null || data === undefined) return false;
  
  // Check for circular references
  try {
    JSON.stringify(data);
  } catch {
    return false;
  }
  
  return true;
};

/**
 * Sanitize data to prevent XSS
 */
const sanitizeData = <T>(data: T): T => {
  if (typeof data === 'string') {
    // Basic XSS prevention
    return data
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '') as T;
  }
  
  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) {
      return data.map(item => sanitizeData(item)) as T;
    } else {
      const sanitized: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(data)) {
        sanitized[key] = sanitizeData(value);
      }
      return sanitized as T;
    }
  }
  
  return data;
};

/**
 * Secure Storage Class
 */
export class SecureStorage {
  private static instance: SecureStorage;
  private storage: Storage;
  private prefix: string;

  constructor(storage: Storage = localStorage, prefix: string = 'secure_') {
    this.storage = storage;
    this.prefix = prefix;
  }

  static getInstance(): SecureStorage {
    if (!SecureStorage.instance) {
      SecureStorage.instance = new SecureStorage();
    }
    return SecureStorage.instance;
  }

  /**
   * Set encrypted data with expiration
   */
  set<T>(key: string, value: T, expiresIn?: number): boolean {
    try {
      if (!validateData(value)) {
        console.warn('Invalid data provided to secure storage');
        return false;
      }

      const sanitizedValue = sanitizeData(value);
      const data: StorageData = {
        value: sanitizedValue,
        timestamp: Date.now(),
        expiresAt: expiresIn ? Date.now() + expiresIn : undefined
      };

      const encryptedData = encrypt(JSON.stringify(data));
      const fullKey = `${this.prefix}${key}`;
      
      this.storage.setItem(fullKey, encryptedData);
      return true;
    } catch (error) {
      console.error('Failed to set secure storage item:', error);
      return false;
    }
  }

  /**
   * Get and decrypt data
   */
  get<T = any>(key: string): T | null {
    try {
      const fullKey = `${this.prefix}${key}`;
      const encryptedData = this.storage.getItem(fullKey);
      
      if (!encryptedData) return null;

      const decryptedData = decrypt(encryptedData);
      const data: StorageData = JSON.parse(decryptedData);

      // Check expiration
      if (data.expiresAt && Date.now() > data.expiresAt) {
        this.remove(key);
        return null;
      }

      return data.value as T;
    } catch (error) {
      console.error('Failed to get secure storage item:', error);
      this.remove(key); // Remove corrupted data
      return null;
    }
  }

  /**
   * Remove encrypted data
   */
  remove(key: string): boolean {
    try {
      const fullKey = `${this.prefix}${key}`;
      this.storage.removeItem(fullKey);
      return true;
    } catch (error) {
      console.error('Failed to remove secure storage item:', error);
      return false;
    }
  }

  /**
   * Check if key exists and is not expired
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Clear all secure storage items
   */
  clear(): boolean {
    try {
      const keys = Object.keys(this.storage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          this.storage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('Failed to clear secure storage:', error);
      return false;
    }
  }

  /**
   * Get all secure storage keys
   */
  keys(): string[] {
    try {
      const keys = Object.keys(this.storage);
      return keys
        .filter(key => key.startsWith(this.prefix))
        .map(key => key.replace(this.prefix, ''));
    } catch (error) {
      console.error('Failed to get secure storage keys:', error);
      return [];
    }
  }
}

// Export singleton instance
export const secureStorage = SecureStorage.getInstance();

// Convenience functions
export const secureSet = <T>(key: string, value: T, expiresIn?: number): boolean => {
  return secureStorage.set(key, value, expiresIn);
};

export const secureGet = <T = unknown>(key: string): T | null => {
  return secureStorage.get<T>(key);
};

export const secureRemove = (key: string): boolean => {
  return secureStorage.remove(key);
};

export const secureHas = (key: string): boolean => {
  return secureStorage.has(key);
};

export const secureClear = (): boolean => {
  return secureStorage.clear();
}; 