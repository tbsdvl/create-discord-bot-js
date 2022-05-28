import express from 'express';
import { DiscordBot } from './models/index.js';
import { startUpDiscordBot } from './utils/botUtils.js';

// Start a new express app
const app = express();

// PORT from .env
const PORT = 3000;

startUpDiscordBot(new DiscordBot(app, PORT));