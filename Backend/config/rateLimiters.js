import { createRateLimiter } from "../Middleware/RateLimit/rateLimiterConfiguration.js";

// Very sensitive (login/signup)
export const strictLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 10,
  keyType: 'user',
  message: 'Too many login/signup attempts, please try again later.'
})

// Medium strict (e.g., uploads, payments, heavy endpoints)
export const mediumLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 15,
  keyType: 'user',
  message: 'Too many payment requests. Please try later.'
})

// Standard API usage (general browsing, dashboards)
export const standardLimiter = createRateLimiter({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 100,
  keyType: 'hybrid',
})

// Light protection (notifications, reminders, polling)
export const lightLimiter  = createRateLimiter({
  windowMs: 30 * 1000, // 30 sec
  max: 20,
  keyType: 'user',
})