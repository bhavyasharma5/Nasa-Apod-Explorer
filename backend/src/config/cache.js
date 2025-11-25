const NodeCache = require('node-cache');

const CACHE_TTL = parseInt(process.env.CACHE_TTL) || 3600;
const CACHE_MAX_KEYS = parseInt(process.env.CACHE_MAX_KEYS) || 100;

class CacheManager {
  constructor() {
    this.cache = new NodeCache({
      stdTTL: CACHE_TTL,
      checkperiod: 120,
      useClones: false,
      maxKeys: CACHE_MAX_KEYS
    });

    this.cache.on('expired', (key, value) => {
      console.log(`Cache expired for key: ${key}`);
    });
  }

  get(key) {
    try {
      const value = this.cache.get(key);
      if (value !== undefined) {
        console.log(`Cache HIT for key: ${key}`);
        return value;
      }
      console.log(`Cache MISS for key: ${key}`);
      return undefined;
    } catch (err) {
      console.error('Cache get error:', err);
      return undefined;
    }
  }

  set(key, value, ttl = CACHE_TTL) {
    try {
      const keys = this.cache.keys();
      if (keys.length >= CACHE_MAX_KEYS) {
        const oldestKey = keys[0];
        this.cache.del(oldestKey);
        console.log(`Cache full, removed oldest key: ${oldestKey}`);
      }

      const success = this.cache.set(key, value, ttl);
      if (success) {
        console.log(`Cache SET for key: ${key}`);
      }
      return success;
    } catch (err) {
      console.error('Cache set error:', err);
      return false;
    }
  }

  delete(key) {
    return this.cache.del(key);
  }

  flush() {
    this.cache.flushAll();
    console.log('Cache flushed');
  }

  getStats() {
    return this.cache.getStats();
  }
}

const cacheManager = new CacheManager();

module.exports = cacheManager;

