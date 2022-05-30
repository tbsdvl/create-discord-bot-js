import express from 'express';
import interactions from './interactions';
const router = express.Router();


router.use('/api/v1/', interactions);

export default router;