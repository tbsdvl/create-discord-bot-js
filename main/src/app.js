import express from 'express';
import { DiscordBot } from './models/index.js';
import { startUpDiscordBot } from './utils/botUtils.js';

// Express app options
const options = {
    app: express(),
    PORT: process.env.PORT || 3000,
};

// Express middleware
// const middleware = [
//     express.json({ verify: })
// ];

startUpDiscordBot(new DiscordBot(options));