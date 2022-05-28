import { DiscordBot } from '../../main/src/models/index.js';
import { startUpDiscordBot, verifyDiscordRequest, validateKey, checkGuildCommands } from '../../main/src/utils/botUtils';
import express from "express";
import 'jest';
import 'dotenv';

let Bot;
const testDummyKey = "invalid_key";

beforeAll(() => {
    // Setup options object for Discord Bot
    const options = {
        app: express(),
        PORT: 3000,
    }

    Bot = new DiscordBot(options);
});

afterEach(() => {
    // Shut down bot's express server
    Bot.stopListening();
});

describe('verifyDiscordRequest', () => {

    it('should throw error for invalid PUBLIC_KEY string', () => {
        expect(Bot.app.use(express.json({ verify: verifyDiscordRequest(testDummyKey) }))).toThrow();
    });

    it('should return a 401 status message on response', () => {
        expect(Bot.app.use(express.json({ verify: verifyDiscordRequest(process.env.PUBLIC_KEY) }))).toThrow();
    });
});