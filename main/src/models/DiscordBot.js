import Express from "express";

class DiscordBot {

    /**
     * 
     * @param {Express} app The DiscordBots express application
     * @param {string | number} PORT DiscordBot's express app will listen for this port number
     */ 
    constructor(options, middleware=null) {
        this.app = options.app;
        this.PORT = options.PORT;
        this.middleware = middleware || null;
    }

    /**
     * 
     * @param {string | number} PORT
     */
    setPort(PORT) {
        this.PORT = PORT;
    }

    // Method to listen for app on instance's port
    listenForPort() {
        this.app.listen(this.PORT);
    }
}

export default DiscordBot;