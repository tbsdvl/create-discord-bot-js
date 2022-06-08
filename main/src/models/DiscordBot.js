import Express from "express";
import 'dotenv/config';
import { checkGuildCommands } from '../utils/botUtils.js';

class DiscordBot {

    /**
     * 
     * @param {Express} options The DiscordBots options for its express application
     * @param {null | Array} middleware Array of middleware used by DiscordBot's express application 
     * @param
     */ 
    constructor(options, middleware=null, commands=null) {
        this.app = options.app;
        this.PORT = options.PORT;
        this.middleware = middleware || [];
        this.commands = commands || [];
        this.server = false;
    }

    /**
     * 
     * @param {string | number} PORT
     */
    setPort(PORT) {
        this.PORT = PORT;
    }

    // Method to tell app to start up on DiscordBot instance's port
    startListening() {

        if(this.server) {
            console.log("DiscordBot's express application is already listening on port:" + this.PORT);
            return;
        };

        try {
            this.server = this.app.listen(this.PORT, () => {
                console.log('Checking commands!');
                checkGuildCommands(process.env.APP_ID, process.env.GUILD_ID, this.commands);
            });
        } catch (err) {
            throw err;
        }
    }

    stopListening() {

        if(!this.server) {
            console.log("DiscordBot's express application is not listening for any ports.");
            return;
        }

        try {
            console.log('Closing server...');
            this.server.close();
            this.server = false;
            return;
        } catch (err) {
            throw err;
        }
    }

    setMiddleware(middleware) {
        this.middleware = middleware;
    }

    useMiddleware() {

        if(this.middleware.length < 1) {
            console.log('Discord Bot has no middleware');
            return;
        }

        try{
            for(let i = 0; i < this.middleware.length; i++) {
                this.app.use(this.middleware[i]);
            }
        } catch (err) {
            throw err;
        }
    }
}

export default DiscordBot;