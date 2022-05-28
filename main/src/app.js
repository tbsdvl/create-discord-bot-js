import express from 'express';
import { DiscordBot } from './models';
import { startUpDiscordBot } from './utils/botUtils';

// Start a new express app
const app = express();

// PORT from .env
const PORT = process.env.PORT;

startUpDiscordBot(new DiscordBot(app, PORT));