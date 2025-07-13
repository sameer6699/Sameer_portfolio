/**
 * Secure API Client
 * Handles CSRF tokens, environment validation, and secure communication
 */

import { getCSRFToken, getCSRFHeaderName } from './csrf';
import { APIConfig, APIResponse, APIError } from '../types';

class APIClient {
  private config: Required<APIConfig>;
  private baseURL: string;

  constructor(config: APIConfig = {}) {
    this.config = {
      baseURL: config.baseURL || this.getBackendURL(),
      timeout: config.timeout || 10000,
      retries: config.retries || 3,
      retryDelay: config.retryDelay || 1000
    };
    this.baseURL = this.config.baseURL;
  }

  /**
   * Get backend URL with proper validation
   */
  private getBackendURL(): string {
    // Check for environment variable first
    const envURL = import.meta.env.VITE_BACKEND_URL;
    
    if (envURL) {
      // Validate URL format
      try {
        new URL(envURL);
        return envURL;
      } catch {
        console.warn('Invalid VITE_BACKEND_URL format, falling back to proxy');
      }
    }
    
    // Fallback to proxy for development
    if (import.meta.env.DEV) {
      return window.location.origin; // Use current origin for proxy
    }
    
    // Production fallback - use a default backend URL or show error
    console.error('VITE_BACKEND_URL environment variable is required in production');
    // Return a fallback URL or throw error based on your preference
    return 'https://sameer-portfolio-backend.onrender.com'; // Default fallback
  }

  /**
   * Validate environment variables
   */
  private validateEnvironment(): void {
    if (!import.meta.env.DEV && !import.meta.env.VITE_BACKEND_URL) {
      console.warn('VITE_BACKEND_URL environment variable is not set in production');
      // Don't throw error, just log warning
    }
  }

  /**
   * Get CSRF token for request
   */
  private getCSRFToken(): string | null {
    return getCSRFToken();
  }

  /**
   * Create request headers with security measures
   */
  private createHeaders(additionalHeaders?: Record<string, string>): Headers {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...additionalHeaders
    });

    // Add CSRF token if available
    const csrfToken = this.getCSRFToken();
    if (csrfToken) {
      headers.set(getCSRFHeaderName(), csrfToken);
    }

    // Add security headers
    headers.set('X-Requested-With', 'XMLHttpRequest');
    
    return headers;
  }

  /**
   * Create request with timeout
   */
  private async createRequest(
    url: string, 
    options: RequestInit
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Retry request with exponential backoff
   */
  private async retryRequest<T>(
    requestFn: () => Promise<T>,
    retries: number = this.config.retries
  ): Promise<T> {
    try {
      return await requestFn();
    } catch (error) {
      if (retries > 0 && this.isRetryableError(error)) {
        await this.delay(this.config.retryDelay);
        return this.retryRequest(requestFn, retries - 1);
      }
      throw error;
    }
  }

  /**
   * Check if error is retryable
   */
  private isRetryableError(error: unknown): boolean {
    // Network errors or 5xx server errors are retryable
    if (error && typeof error === 'object' && 'name' in error && error.name === 'AbortError') return false;
    if (error && typeof error === 'object' && 'status' in error && typeof error.status === 'number' && error.status >= 500 && error.status < 600) return true;
    if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string' && error.message.includes('network')) return true;
    return false;
  }

  /**
   * Delay function for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Handle API response
   */
  private async handleResponse<T>(response: Response): Promise<APIResponse<T>> {
    const contentType = response.headers.get('content-type');
    let data: T;

    try {
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text() as T;
      }
    } catch (error) {
      throw this.createError('Failed to parse response', response.status, response.statusText);
    }

    if (!response.ok) {
      const errorMessage = typeof data === 'object' && data !== null && 'message' in data 
        ? (data as any).message 
        : 'Request failed';
      throw this.createError(
        errorMessage,
        response.status,
        response.statusText,
        data
      );
    }

    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    };
  }

  /**
   * Create standardized error
   */
  private createError(
    message: string,
    status: number,
    statusText: string,
    data?: unknown
  ): APIError {
    return {
      message,
      status,
      statusText,
      data
    };
  }

  /**
   * Make GET request
   */
  async get<T = unknown>(endpoint: string, params?: Record<string, unknown>): Promise<APIResponse<T>> {
    this.validateEnvironment();
    
    const url = new URL(endpoint, this.baseURL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return this.retryRequest(async () => {
      const response = await this.createRequest(url.toString(), {
        method: 'GET',
        headers: this.createHeaders()
      });
      
      return this.handleResponse<T>(response);
    });
  }

  /**
   * Make POST request
   */
  async post<T = unknown>(endpoint: string, data?: unknown): Promise<APIResponse<T>> {
    this.validateEnvironment();
    
    const url = new URL(endpoint, this.baseURL);
    
    return this.retryRequest(async () => {
      const response = await this.createRequest(url.toString(), {
        method: 'POST',
        headers: this.createHeaders(),
        body: data ? JSON.stringify(data) : undefined
      });
      
      return this.handleResponse<T>(response);
    });
  }

  /**
   * Make PUT request
   */
  async put<T = unknown>(endpoint: string, data?: unknown): Promise<APIResponse<T>> {
    this.validateEnvironment();
    
    const url = new URL(endpoint, this.baseURL);
    
    return this.retryRequest(async () => {
      const response = await this.createRequest(url.toString(), {
        method: 'PUT',
        headers: this.createHeaders(),
        body: data ? JSON.stringify(data) : undefined
      });
      
      return this.handleResponse<T>(response);
    });
  }

  /**
   * Make DELETE request
   */
  async delete<T = unknown>(endpoint: string): Promise<APIResponse<T>> {
    this.validateEnvironment();
    
    const url = new URL(endpoint, this.baseURL);
    
    return this.retryRequest(async () => {
      const response = await this.createRequest(url.toString(), {
        method: 'DELETE',
        headers: this.createHeaders()
      });
      
      return this.handleResponse<T>(response);
    });
  }

  /**
   * Make PATCH request
   */
  async patch<T = unknown>(endpoint: string, data?: unknown): Promise<APIResponse<T>> {
    this.validateEnvironment();
    
    const url = new URL(endpoint, this.baseURL);
    
    return this.retryRequest(async () => {
      const response = await this.createRequest(url.toString(), {
        method: 'PATCH',
        headers: this.createHeaders(),
        body: data ? JSON.stringify(data) : undefined
      });
      
      return this.handleResponse<T>(response);
    });
  }
}

// Export singleton instance
export const apiClient = new APIClient();

// Convenience functions
export const apiGet = <T = unknown>(endpoint: string, params?: Record<string, unknown>) => {
  return apiClient.get<T>(endpoint, params);
};

export const apiPost = <T = unknown>(endpoint: string, data?: unknown) => {
  return apiClient.post<T>(endpoint, data);
};

export const apiPut = <T = unknown>(endpoint: string, data?: unknown) => {
  return apiClient.put<T>(endpoint, data);
};

export const apiDelete = <T = unknown>(endpoint: string) => {
  return apiClient.delete<T>(endpoint);
};

export const apiPatch = <T = unknown>(endpoint: string, data?: unknown) => {
  return apiClient.patch<T>(endpoint, data);
};

// Export types
export type { APIConfig, APIResponse, APIError }; 