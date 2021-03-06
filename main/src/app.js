import express from 'express';
import 'dotenv/config';
import routes from './api/index.js';
import { DiscordBot } from './models/index.js';
import { startUpDiscordBot, verifyDiscordRequest } from './utils/botUtils.js';
import { TEST_COMMAND } from './commands/index.js';

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

const commands = [
    TEST_COMMAND
];

startUpDiscordBot(new DiscordBot(options, middleware, commands));