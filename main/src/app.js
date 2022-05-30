import express from 'express';
import 'dotenv';
import routes from './api';
import { DiscordBot } from './models/index.js';
import { startUpDiscordBot, verifyDiscordRequest } from './utils/botUtils.js';

// Express app options
const options = {
    app: express(),
    PORT: process.env.PORT || 3000,
};

// Express middleware
const middleware = [
    express.json({ verify: verifyDiscordRequest(process.env.PUBLIC_KEY) }),
    routes,
    express.urlencoded({ extended: true }),
];

startUpDiscordBot(new DiscordBot(options, middleware));