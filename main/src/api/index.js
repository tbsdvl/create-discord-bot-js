import interactions from './interactions/index.js';
import router from 'express';

router().use('/api/v1/', interactions);

export default router;