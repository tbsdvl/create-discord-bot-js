import { DiscordBot } from '../../main/src/models/index.js';
import { startUpDiscordBot } from '../../main/src/utils/botUtils';
import express from "express";
import 'jest';

let Bot;

beforeAll(() => {
    // Setup test object for instances of App interface
    const options = {
        app: express(),
        PORT: 3000,
        // middleware: [express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) })]
    }

    const newBot = new DiscordBot(options);
    Bot = newBot;
});

describe('DiscordBot constructor', () => {

    
    it('should instantiate a new Bot object of type App', () => {
        expect(Bot).not.toBeNull();
    });

    it("should return the type of the DiscordBot's express app", () => {
        expect(typeof Bot.app).toBe(typeof express);
    });
    
    it("should return the PORT property for the DiscordBot instance", () => {
        expect(Bot.PORT).toBe(3000);
    });
});

describe('startUpDiscordBot', () => {
    
    it('should start the app to listen on port 3000', () => {
        expect(startUpDiscordBot(Bot)).toBe(true);
    });
});
