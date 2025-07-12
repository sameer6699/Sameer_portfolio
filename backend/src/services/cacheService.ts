interface CacheEntry {
  response: string;
  timestamp: number;
  context?: any;
}

class CacheService {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
  private readonly MAX_CACHE_SIZE = 1000; // Maximum cache entries

  /**
   * Generate cache key from messages and context
   */
  private generateCacheKey(messages: { role: string; content: string }[], context?: any): string {
    const lastMessage = messages[messages.length - 1]?.content || '';
    const contextHash = context ? JSON.stringify(context).slice(0, 100) : '';
    return `${lastMessage.toLowerCase().trim()}_${contextHash}`.replace(/[^a-zA-Z0-9_]/g, '_');
  }

  /**
   * Get cached response if available and not expired
   */
  getCachedResponse(messages: { role: string; content: string }[], context?: any): string | null {
    const key = this.generateCacheKey(messages, context);
    const entry = this.cache.get(key);
    const now = Date.now();

    if (entry && (now - entry.timestamp) < this.CACHE_DURATION) {
      console.log(`[Cache Service] Cache hit for key: ${key}`);
      return entry.response;
    }

    // Remove expired entry
    if (entry) {
      this.cache.delete(key);
    }

    return null;
  }

  /**
   * Cache a response
   */
  cacheResponse(messages: { role: string; content: string }[], response: string, context?: any): void {
    const key = this.generateCacheKey(messages, context);
    const now = Date.now();

    // Check cache size limit
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      this.evictOldestEntries();
    }

    this.cache.set(key, {
      response,
      timestamp: now,
      context
    });

    console.log(`[Cache Service] Cached response for key: ${key}`);
  }

  /**
   * Evict oldest cache entries when limit is reached
   */
  private evictOldestEntries(): void {
    const entries = Array.from(this.cache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    
    // Remove oldest 20% of entries
    const toRemove = Math.ceil(this.MAX_CACHE_SIZE * 0.2);
    for (let i = 0; i < toRemove && i < entries.length; i++) {
      this.cache.delete(entries[i][0]);
    }

    console.log(`[Cache Service] Evicted ${toRemove} old cache entries`);
  }

  /**
   * Clear expired entries
   */
  cleanup(): void {
    const now = Date.now();
    let removedCount = 0;

    for (const [key, entry] of this.cache.entries()) {
      if ((now - entry.timestamp) >= this.CACHE_DURATION) {
        this.cache.delete(key);
        removedCount++;
      }
    }

    if (removedCount > 0) {
      console.log(`[Cache Service] Cleaned up ${removedCount} expired cache entries`);
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size: number;
    maxSize: number;
    hitRate: number;
  } {
    return {
      size: this.cache.size,
      maxSize: this.MAX_CACHE_SIZE,
      hitRate: 0 // Would need to track hits/misses for accurate rate
    };
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
    console.log('[Cache Service] Cache cleared');
  }
}

export const cacheService = new CacheService();

// Clean up expired entries every 5 minutes
setInterval(() => {
  cacheService.cleanup();
}, 5 * 60 * 1000); 