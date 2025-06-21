import express from 'express'
import {
  createConference,
  getConference,
  getSingleConference,
  updateConference
} from './conference.controller.js'
import verifyToken from '../../Middleware/verifyToken.js'
const router = express.Router()

router.get('/:id', getSingleConference)
router.put('update-conference/:id',verifyToken,updateConference)
router.post('/create-conference', verifyToken, createConference)
// TODO: apply the token validation
router.get('/', getConference)
export default router
