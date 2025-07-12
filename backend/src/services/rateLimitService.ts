interface RateLimitInfo {
  lastRequest: number;
  requestCount: number;
  resetTime: number;
  isBlocked: boolean;
  blockUntil: number;
}

class RateLimitService {
  private rateLimits: Map<string, RateLimitInfo> = new Map();
  private readonly WINDOW_SIZE = 60 * 1000; // 1 minute window
  private readonly MAX_REQUESTS_PER_MINUTE = 15; // Conservative limit
  private readonly BLOCK_DURATION = 60 * 1000; // 1 minute block after limit

  /**
   * Check if a request is allowed based on rate limits
   */
  canMakeRequest(sessionId: string): { allowed: boolean; waitTime?: number; reason?: string } {
    const now = Date.now();
    const userLimit = this.rateLimits.get(sessionId);

    // If no previous requests, allow
    if (!userLimit) {
      this.rateLimits.set(sessionId, {
        lastRequest: now,
        requestCount: 1,
        resetTime: now + this.WINDOW_SIZE,
        isBlocked: false,
        blockUntil: 0
      });
      return { allowed: true };
    }

    // Check if user is currently blocked
    if (userLimit.isBlocked && now < userLimit.blockUntil) {
      const waitTime = userLimit.blockUntil - now;
      return { 
        allowed: false, 
        waitTime, 
        reason: 'Rate limit exceeded. Please wait before making another request.' 
      };
    }

    // Reset counter if window has passed
    if (now > userLimit.resetTime) {
      userLimit.requestCount = 1;
      userLimit.resetTime = now + this.WINDOW_SIZE;
      userLimit.isBlocked = false;
      userLimit.blockUntil = 0;
      userLimit.lastRequest = now;
      return { allowed: true };
    }

    // Check if within limits
    if (userLimit.requestCount < this.MAX_REQUESTS_PER_MINUTE) {
      userLimit.requestCount++;
      userLimit.lastRequest = now;
      return { allowed: true };
    }

    // Rate limit exceeded - block user
    userLimit.isBlocked = true;
    userLimit.blockUntil = now + this.BLOCK_DURATION;
    const waitTime = this.BLOCK_DURATION;
    
    return { 
      allowed: false, 
      waitTime, 
      reason: 'Rate limit exceeded. Please wait 1 minute before making another request.' 
    };
  }

  /**
   * Handle rate limit error from Gemini API
   */
  handleRateLimitError(sessionId: string, retryAfter?: number): void {
    const now = Date.now();
    const blockDuration = retryAfter ? retryAfter * 1000 : this.BLOCK_DURATION;
    
    this.rateLimits.set(sessionId, {
      lastRequest: now,
      requestCount: this.MAX_REQUESTS_PER_MINUTE,
      resetTime: now + this.WINDOW_SIZE,
      isBlocked: true,
      blockUntil: now + blockDuration
    });

    console.log(`[Rate Limit Service] Session ${sessionId} blocked for ${blockDuration}ms due to API rate limit`);
  }

  /**
   * Get rate limit status for a session
   */
  getRateLimitStatus(sessionId: string): {
    isBlocked: boolean;
    waitTime?: number;
    requestsRemaining: number;
    resetTime: number;
  } {
    const userLimit = this.rateLimits.get(sessionId);
    const now = Date.now();

    if (!userLimit) {
      return {
        isBlocked: false,
        requestsRemaining: this.MAX_REQUESTS_PER_MINUTE,
        resetTime: now + this.WINDOW_SIZE
      };
    }

    const isBlocked = userLimit.isBlocked && now < userLimit.blockUntil;
    const waitTime = isBlocked ? userLimit.blockUntil - now : 0;
    const requestsRemaining = Math.max(0, this.MAX_REQUESTS_PER_MINUTE - userLimit.requestCount);

    return {
      isBlocked,
      waitTime,
      requestsRemaining,
      resetTime: userLimit.resetTime
    };
  }

  /**
   * Clean up old rate limit entries
   */
  cleanup(): void {
    const now = Date.now();
    const oneHourAgo = now - (60 * 60 * 1000);

    for (const [sessionId, limit] of this.rateLimits.entries()) {
      if (limit.lastRequest < oneHourAgo) {
        this.rateLimits.delete(sessionId);
      }
    }
  }
}

export const rateLimitService = new RateLimitService();

// Clean up old entries every 10 minutes
setInterval(() => {
  rateLimitService.cleanup();
}, 10 * 60 * 1000); 