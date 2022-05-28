import Express from "express";

class DiscordBot {

    /**
     * 
     * @param {Express} options The DiscordBots options for its express application
     * @param {null | Array} middleware Array of middleware used by DiscordBot's express application 
     * @param
     */ 
    constructor(options, middleware=null) {
        this.app = options.app;
        this.PORT = options.PORT;
        this.middleware = middleware || [];
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
    listenForPort() {

        if(this.server) {
            console.log("DiscordBot's express application is already listening on port:" + this.PORT);
            return;
        };

        try {
            this.server = this.app.listen(this.PORT);
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
            console.log('Closing server...')
            this.server.close();
            this.server = false;
            return;
        } catch (err) {
            throw err;
        }
    }
}

export default DiscordBot;