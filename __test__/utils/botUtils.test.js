import { DiscordBot } from '../../main/src/models/index.js';
import { startUpDiscordBot, verifyDiscordRequest, validateKey, checkGuildCommands } from '../../main/src/utils/botUtils';
import express from "express";
import 'jest';
import 'dotenv';

let Bot;
const testDummyKey = "invalid_key";

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
    // Shut down bot's express server
    Bot.stopListening();
});

// Function to verify a request sent to the Bot using the Discord PUBLIC_KEY
// Need to check the signature and timestamp of the request
// If the signature & timestamp are not valid after calling verifyKey,
// Return an 401 status code back to the client

// Sequence
// Expres app calls 'use' method to add a new middleware to the server
// The app will use express.json to parse a verification request from a client
// The verification object will include a property of 'verify' which has a value
// of verifyDiscordRequest(process.env.PUBLIC_KEY)

// Inside verifyDiscordRequest check the request's signature using req.get('X-Signature-ed25519'),
// and it's time stamp using req.get('X-Signature'Timestamp');

// If verifyKey function from discord-interactions does not return a valid verification from the request,
// send a 401 status and console log a new 'Bad signature' error


describe('verifyDiscordRequest', () => {

    it('should throw error for invalid PUBLIC_KEY string', () => {
        expect(Bot.app.use(express.json({ verify: verifyDiscordRequest(testDummyKey) }))).toThrow();
    });

    it('should return a 401 status message on response', () => {
        expect(Bot.app.use(express.json({ verify: verifyDiscordRequest(process.env.PUBLIC_KEY) }))).toThrow();
    });
});

// describe('verifyDiscordRequest', () => {

//     it('should throw error for incoming request using invalid Discord Token', () => {
//         expect(verifyDiscordRequest(testDummyKey)).toBe(false);
//     });
// });

