import { interactionsController } from '../../controllers';
import router from 'express';

router().route('/')
    .post(interactionsController.postInteraction);

export default router;