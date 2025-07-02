import express from 'express'
import { getRole } from './role.controller.js';
const router = express.Router();

router.get('/',getRole)

export default router;