import { interactionsController } from '../../controllers';
import express from 'express';

const router = express.Router();

router.route('/')
    .post(interactionsController.postInteraction);

export default router;