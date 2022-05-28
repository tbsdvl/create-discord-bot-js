import DiscordBot from "../models/DiscordBot.js";

/** 
 *@param {DiscordBot} bot An instance of type DiscordBot 
*/
export const startUpDiscordBot = (bot) => {

    // Check for a bot's port

    try {

        // Start up app
        bot.startApp();

        // Return true if no errors thrown
        console.log(`Bot started on port: ${bot.PORT}`)
        return true;
        
    } catch (err) {
        // Throw error function based on type of error passed in catch
        throw err;
    };
};