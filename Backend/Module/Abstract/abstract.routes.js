import express from 'express'
import {
  changeAbstractStatus,
  createAbstract,
  getAbstract,
  getAbstractByCategory
} from './abstract.controller.js'
import abstractUploaded from '../../Middleware/FileUpload/abstractUploaded.js'
import verifyToken from '../../Middleware/verifyToken.js'

const router = express.Router()

router.get('/get-abstract-category', verifyToken, getAbstractByCategory)
// TODO: add the token validation of admin token
router.get('/:conference_id', getAbstract)
router.post(
  '/create-abstract',
  verifyToken,
  abstractUploaded.fields([
    { name: 'image', maxCount: 1 },
    { name: 'file', maxCount: 1 }
  ]),
  createAbstract
)

router.post('/change-status/:id', verifyToken, changeAbstractStatus)


export default router
