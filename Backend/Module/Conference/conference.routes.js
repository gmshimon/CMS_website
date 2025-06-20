import express from 'express'
import { createConference, getConference } from './conference.controller.js';
import verifyToken from '../../Middleware/verifyToken.js';
const router = express.Router();

// TODO: apply the admin token validation
router.post('/create-conference',verifyToken,createConference)
// TODO: apply the token validation
router.get('/',getConference)
export default router