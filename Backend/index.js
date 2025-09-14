import express from 'express'
import http from 'http'
import cors from 'cors'
import { setupWebSocket } from './socket/index.js'
import globalErrorHandler from './Middleware/GlobalErrorHandler/globalErrorHandler.js'
import { connectDB } from './config/db.js'
import { corsOptions } from './config/cors.js'
import { ENV } from './config/env.js'

// Initialize app
const app = express()
const server = http.createServer(app)

// ✅ Trust proxy for real IPs
app.set('trust proxy', 1)

// ✅ Middlewares
app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// ✅ WebSocket setup
setupWebSocket(server)

// ✅ Connect DB
connectDB()

// ✅ Routes
import userRouter from './Module/User/user.routes.js'
import abstractRouter from './Module/Abstract/abstract.routes.js'
import conferenceRouter from './Module/Conference/conference.routes.js'
import conferenceRegRouter from './Module/Conference_reg/conference_reg.routes.js'
import paperRouter from './Module/Paper/paper.routes.js'
import notificationRouter from './Module/Notification/notification.routes.js'
import roleRouter from './Module/Role/role.routes.js'
import adminRouter from './Module/Admin/admin.routes.js'
import reviewRouter from './Module/Review/review.routes.js'
import scheduleRouter from './Module/Schedule/schedule.routes.js'
import markRouter from './Module/Mark/mark.routes.js'

app.use('/api/v1/user', userRouter)
app.use('/api/v1/abstract', abstractRouter)
app.use('/api/v1/conference', conferenceRouter)
app.use('/api/v1/conference_reg', conferenceRegRouter)
app.use('/api/v1/paper', paperRouter)
app.use('/api/v1/notification', notificationRouter)
app.use('/api/v1/role', roleRouter)
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/review',reviewRouter)
app.use('/api/v1/schedules',scheduleRouter)
app.use('/api/v1/mark',markRouter)

app.get('/', async (req, res) => {
  res.send('API is running')
})

// ✅ Global error handler
app.use(globalErrorHandler)

// ✅ Start server
server.listen(ENV.PORT, () => {
  console.log(`🚀 Server is running on port ${ENV.PORT}`)
})

export default app
