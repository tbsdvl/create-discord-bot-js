import { DiscordBot } from "../models/index.js";
import { verifyKey } from "discord-interactions";

/** 
 *@param {DiscordBot} bot An instance of class DiscordBot 
 *@description Function for starting up a Discord Bot on an express.js app
*/
export const startUpDiscordBot = (bot) => {
    // Check for a bot's abilty to listen for a port
    if (!bot.app.listen) {
        throw new TypeError("DiscordBot's 'app' property has no access to 'listen' method.");
    };

    try {
        // Tell express app to start listening on the specified port on DiscordBot
        bot.startListening();

        // Use the Bot's middleware
        bot.useMiddleware();

        // Return true if no errors thrown
        console.log(`DiscordBot listening on port: ${bot.PORT}`);
        return true;
    } catch (err) {
        throw err;
    };
};

/**
 * 
 * @param {string} clientKey The DiscordBot's PUBLIC_KEY .env variable
 * @description Verify incoming requests communicating with the Discord Bot
 */
export const verifyDiscordRequest = (clientKey) => {

    return function (req, res, buf, encoding, clientKey) {
        try {
            if (req.get('X-Signature-Ed25519') && req.get('X-Signature-Timestamp')) {
                verifyKey(buf, req, res, clientKey);
            }
        } catch (err) {
            res.status(401).send('Invalid signature');
            throw new Error('Invalid signature or timestamp on incoming request');
        }
    };
};

// Function to check for installed commands on the Discord server
// If commands are not installed, install the commands
// Otherwise continue running the express app
export const checkGuildCommands = () => {

};