import mongoose from 'mongoose'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { setupWebSocket } from './socket/index.js'
// import sessionMiddleware from './Middleware/Redis/sessionConfig.js';
const { query } = express
dotenv.config()
const port = process.env.PORT || 5000

const app = express()
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
)
const server = http.createServer(app)

// Setup socket.io on the HTTP server
setupWebSocket(server)

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json())
// app.use(sessionMiddleware)

const uri = 'mongodb://127.0.0.1:27017/cms_website'
// const uri = process.env.MONGODB_URI

mongoose.connect(uri).then(() => {
  console.log('Connected to MongoDB')
})

import userRouter from './Module/User/user.routes.js'
import abstractRouter from './Module/Abstract/abstract.routes.js'
import conferenceRouter from './Module/Conference/conference.routes.js'
import conferenceRegRouter from './Module/Conference_reg/conference_reg.routes.js'
import paperRouter from './Module/Paper/paper.routes.js'
import notificationRouter from './Module/Notification/notification.routes.js'
import roleRouter from './Module/Role/role.routes.js'
import adminRouter from './Module/Admin/admin.routes.js'
import { sendEmail } from './Utilis/sendEmail.js'

app.use('/api/v1/user', userRouter)
app.use('/api/v1/abstract', abstractRouter)
app.use('/api/v1/conference', conferenceRouter)
app.use('/api/v1/conference_reg', conferenceRegRouter)
app.use('/api/v1/paper', paperRouter)
app.use('/api/v1/notification', notificationRouter)
app.use('/api/v1/role', roleRouter)
app.use('/api/v1/admin',adminRouter)

app.get('/', async (req, res) => {
  res.send('API is running')
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default app
