import interactionsRoutes from "./interactions.js";
import express from 'express';

const router = express.Router();

router.use('/interactions', interactionsRoutes);

export default router;