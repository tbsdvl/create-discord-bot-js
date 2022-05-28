import DiscordBot from "../models/DiscordBot.js";

/** 
 *@param {DiscordBot} bot An instance of type DiscordBot 
*/
export const startUpDiscordBot = (bot) => {

    // Check for a bot's abilty to listen for a port
    if(!bot.app.listen) {
        throw new TypeError("DiscordBot's app cannot access 'listen' method.")
    }

    try {

        // Tell express app to start listening on the specified port on DiscordBot
        bot.listenForPort();

        // Return true if no errors thrown
        console.log(`DiscordBot listening on port: ${bot.PORT}`)
        return true;
        
    } catch (err) {
        // Throw error function based on type of error passed in catch
        throw err;
    };
};

// Function to verify a request from the Bot's discord client key
// Need to check the signature and timestamp of the request
// If the signature & timestamp are not valid after calling verifyKey,
// Return an 401 status code back to the client

// Function to check for installed commands on the Discord server