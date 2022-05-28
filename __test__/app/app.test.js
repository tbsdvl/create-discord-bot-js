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
            Bot.listenForPort();
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