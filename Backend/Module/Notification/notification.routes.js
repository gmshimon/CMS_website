import express from 'express';
import { getUserNotifications } from './notification.controller.js';

const router = express.Router();

router.get('/:userId', getUserNotifications);

export default router;
