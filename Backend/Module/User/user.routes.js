import express from 'express'
import userImageUploader from '../../Middleware/FileUpload/userImage.js'
import { createUser, fetchUser, updateUserProfile } from './user.controller.js'
import verifyToken from '../../Middleware/verifyToken.js'

const router = express.Router()

router.route('/').post(userImageUploader.single('image'), createUser)
router.route('/get-user').post(fetchUser)
router.route('/update-profile').put(verifyToken,updateUserProfile)
export default router
