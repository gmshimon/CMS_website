// Middleware/RateLimit/rateLimiter.js
import rateLimit, { ipKeyGenerator } from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import redisClient from '../Redis/redisClient.js'

function hybridKeyGenerator(req) {
  if (req.user && req.user._id) {
    return `user:${req.user._id}`
  }
  // ✅ use helper for IP safety (IPv4 + IPv6 normalized)
  return ipKeyGenerator(req)
}

export function createRateLimiter({
  windowMs = 60 * 1000,
  max = 100,
  keyType = 'hybrid',
  message = 'Too many requests, please try again later.',
}) {
  return rateLimit({
    store: new RedisStore({
      // For node-redis client: use sendCommand([...args])
      sendCommand: (command, ...args) =>
        redisClient.sendCommand([command, ...args]),
    }),
    windowMs,
    max,
    keyGenerator: (req) => {
      if (keyType === 'ip')   return ipKeyGenerator(req)
      if (keyType === 'user') {
        return req.user && req.user._id
          ? `user:${req.user._id}`
          : `anon:${ipKeyGenerator(req)}` // ✅ FIXED
      }
      return hybridKeyGenerator(req)
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, _next, options) => {
      res.status(options.statusCode).json({
        success: false,
        message,
      })
    },
  })
}
