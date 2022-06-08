import interactionsController from '../../controllers/index.js';
import express from 'express';

const router = express.Router();

router.route('/')
    .post(interactionsController.postInteraction);

export default router;