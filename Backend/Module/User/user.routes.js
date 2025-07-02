import express from 'express'
import userImageUploader from '../../Middleware/FileUpload/userImage.js'
import { createUser, fetchUser } from './user.controller.js'

const router = express.Router()

router.route('/').post(userImageUploader.single('image'), createUser)
router.route('/get-user').post(fetchUser)

export default router
