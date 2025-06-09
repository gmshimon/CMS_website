// redisClient.js
import redis from 'redis'
import dotenv from 'dotenv'

dotenv.config()

const redis_url = process.env.REDIS_URL

const client = redis.createClient({
  url: redis_url
})

client.on('error', err => console.error('Redis Client Error', err))

;(async () => {
  await client.connect()
  console.log('Connected to Redis')
})()

export default client
