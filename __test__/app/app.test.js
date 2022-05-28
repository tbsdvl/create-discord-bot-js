import { DiscordBot } from '../../main/src/models/index.js';
import { startUpDiscordBot } from '../../main/src/utils/botUtils';
import express from "express";

// Setup an App interface that has fields for
// express(), a port, an array of middleware, 
// listens and executes some additional code

// App interface will include fields for
// the express function, an integer for a port,
// and an array of middleware functions

// App interface will also include a constructor including
// parameters for all of its fields, and methods for 
// executing express, middleware functions, and listening for ports

// In the future, App will include a method for checking & installing
// new commands on the discord server

describe('App interface', () => {

    let Bot;

    beforeAll(() => {
        // Setup test object for instances of App interface
        const options = {
            app: express,
            PORT: 3000,
            // middleware: [express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) })]
        }

        const newBot = new DiscordBot(options.app(), options.PORT);
        Bot = newBot;
    });
    
    it('should instantiate a new Bot object of type App', () => {
        expect(Bot).not.toBeNull();
    });

    // Check for a bot's express app

    // Check for a bot's port
    it("should return the type of the DiscordBot's express app", () => {
        expect(typeof Bot.app).toBe(typeof express);
    });

    it("should return the PORT for the DiscordBot", () => {
        expect(typeof Bot.PORT).toBe(string || number);
    });

    it('should start the app to listen on port 3000', () => {
        expect(startUpDiscordBot(Bot)).toBe(true);
    });
})