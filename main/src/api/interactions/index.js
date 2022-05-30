import { interactionsRoute } from "./interactions";
const router = require('express').Router();

router.use('/interactions', interactionsRoute);

export default router;