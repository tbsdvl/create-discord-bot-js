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
        // Tell DiscordBot's express app to start listening on the specified .env port
        bot.startListening();

        // Use each of the DiscordBot's express middleware
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

export async function DiscordRequest(endpoint, options) {

    const url = 'https://discord.com/api/v10/' + endpoint;

    if (options.body) options.body = JSON.stringify(options.body);

    const res = await fetch(url, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
        },
        ...options
    });
    // throw API errors
    if (!res.ok) {
        const data = await res.json();
        console.log(res.status);
        throw new Error(JSON.stringify(data));
    }
    return res;
}

export const checkGuildCommands = async (appId, guildId, commands) => {
    
    if (guildId === '' || appId === '') return;

    commands.forEach((c) => checkGuildCommand(appId, guildId, c));
};

const checkGuildCommand = async (appId, guildId, commandsArray) => {

    const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

    try {
        const res = await DiscordRequest(endpoint, { method: 'GET' });
        const data = await res.json();

        if (data) {
            const installedNames = data.map((c) => c['name']);
            if (!installedNames.includes(commandsArray['name'])) {
                console.log(`Installing "${commandsArray['name']}"`);
                installGuildCommand(appId, guildId, commandsArray);
            } else {
                console.log(`"${command['name']}" command already installed`);
            }
        }
    } catch (err) {
        console.error(err);
    }
};

const installGuildCommand = async (appId, guildId, command) => {

    const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

    try {
        await DiscordRequest(endpoint, { method: 'POST', body: command });
    } catch (err) {
        console.error(err);
    }
};