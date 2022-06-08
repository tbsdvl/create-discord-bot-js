import interactions from './interactions/index.js';
import express from 'express';

const router = express.Router();

router.use('/api/v1/', interactions);

export default router;