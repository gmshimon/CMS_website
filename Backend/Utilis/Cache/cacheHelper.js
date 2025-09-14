import redisClient from '../../Middleware/Redis/redisClient.js'

/**
 * Safely set cache with TTL
 * @param {string} key - Cache key
 * @param {any} value - Value to store (will be stringified)
 * @param {number} ttl - Expiry time in seconds (default: 600s = 10min)
 */

export const setCache = async (key, value, ttl = 600) => {
  try {
    await redisClient.setEx(key, ttl, JSON.stringify(value))
  } catch (err) {
    console.error(`❌ Redis SET error [${key}]:`, err.message)
  }
}

/**
 * Safely get cache
 * @param {string} key - Cache key
 * @returns {any|null} - Parsed value or null
 */

export const getCache = async (key) => {
  try {
    const data = await redisClient.get(key)
    return data ? JSON.parse(data) : null
  } catch (err) {
    console.error(`❌ Redis GET error [${key}]:`, err.message)
    return null
  }
}

/**
 * Invalidate a single key
 * @param {string} key - Cache key
 */

export const delCache = async (key) => {
  try {
    await redisClient.del(key)
  } catch (err) {
    console.error(`❌ Redis DEL error [${key}]:`, err.message)
  }
}

/**
 * Invalidate all user-related registration caches
 * @param {string} userId - User ID
 */
export const invalidateUserCache = async (userId) => {
  try {
    const keys = await redisClient.keys(`confReg:${userId}:*`)
    if (keys.length > 0) {
      await redisClient.del(keys)
      console.log(`🧹 Redis cache invalidated for user ${userId}`)
    }
  } catch (err) {
    console.error(`❌ Redis cache invalidation failed [${userId}]:`, err.message)
  }
}