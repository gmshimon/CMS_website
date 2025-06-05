import express from 'express';
import { getConferenceReg ,getSingleConferenceReg} from './conference_reg.controller.js';
const router = express.Router();

// TODO: add token validation
router.get('/:conference_id',getConferenceReg)
router.get('/single_conference_reg/:id',getSingleConferenceReg)

export default router;