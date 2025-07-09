import express from 'express'
import userImageUploader from '../../Middleware/FileUpload/userImage.js'

import verifyToken from '../../Middleware/verifyToken.js'
import {
  AdminCreateUser,
  deleteUser,
  getReviewersUser,
  updateUser
} from './admin.controller.js'
const router = express.Router()

// TODO:: add validation of user
router.route('/delete/user/:id').delete(deleteUser)

// TODO:: add validation of user
router.route('/update/user').put(updateUser)

router
  .route('/create-user')
  .post(userImageUploader.single('image'), AdminCreateUser)

// TODO:: add validation of user
router.route('/get/reviewer').get(getReviewersUser)

export default router
