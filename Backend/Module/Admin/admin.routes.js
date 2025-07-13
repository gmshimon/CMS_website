import express from 'express'
import userImageUploader from '../../Middleware/FileUpload/userImage.js'

import verifyToken from '../../Middleware/verifyToken.js'
import {
  AdminCreateUser,
  deleteUser,
  deleteUserImage,
  getRoleBasedUser,
  getUserRoleCounts,
  updateUser,
  updateUserImage
} from './admin.controller.js'
const router = express.Router()

// TODO:: add validation of user
router.route('/delete/user/:id').delete(deleteUser)

// TODO:: add validation of user
router.route('/update/user').put(updateUser)

// TODO:: add validation of user
router.route('/delete/user-image/:id').delete(deleteUserImage)

// TODO:: add validation of user
router
  .route('/update/user-image/:id')
  .put(userImageUploader.single('image'), updateUserImage)

// TODO:: add validation of user
router.route('/total-user').get(getUserRoleCounts)

router
  .route('/create-user')
  .post(userImageUploader.single('image'), AdminCreateUser)

// TODO:: add validation of user
router.route('/get/:role').get(getRoleBasedUser)

export default router
