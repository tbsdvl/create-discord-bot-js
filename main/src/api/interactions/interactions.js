import express from 'express';
import { interactionsController } from '../../controllers';
const router = express.Router();

router.route('/')
    .post(interactionsController);

export default router;