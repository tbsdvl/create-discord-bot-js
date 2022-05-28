import { DiscordBot } from '../../main/src/models/index.js';
import { startUpDiscordBot, verifyDiscordRequest } from '../../main/src/utils/botUtils';
import express from "express";
import 'jest';
import 'dotenv';

let Bot;

beforeAll(() => {
    // Setup test object for instances of App interface
    const options = {
        app: express(),
        PORT: 3000,
    }

    Bot = new DiscordBot(options);
});

afterEach(() => {
    Bot.stopListening();
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

    it("should log the currently active DiscordBot's express server port to the console", () => {
            startUpDiscordBot(Bot);
            Bot.startListening();
    });
});

describe('stopListening', () => {

    it("should indicate that the DiscordBot's express app is currently offline", () => {
        expect(Bot.server).toBe(false);
    });
    
    it("should close the DiscordBot's express app currently listening for a port", () => {
        startUpDiscordBot(Bot);
        Bot.stopListening();
        expect(Bot.server).toBe(false);
    });
});

// Test the app's middleware
describe('useMiddleware', () => {

    it("should add an array of express server middleware to the DiscordBot", () => {
        // Middleware array
        const middleware = [
            express.json({ verify: verifyDiscordRequest(process.env.PUBLIC_KEY)})
        ];

        // Add middleware array to bot
        Bot.setMiddleware(middleware);

        expect(Bot.middleware.length).toBe(1);
    });

    it("should call an app.use() method on each middleware item in a DiscordBot's middleware array", () => {
        // Middleware array
        const middleware = [
            express.json({ verify: verifyDiscordRequest(process.env.PUBLIC_KEY)})
        ];

        Bot.setMiddleware(middleware);

        console.log(Bot.middleware.length);

        // Start the Discord Bot's express server
        Bot.startListening();

        expect(Bot.middleware.length).toBe(1);
        Bot.useMiddleware();
    });
});