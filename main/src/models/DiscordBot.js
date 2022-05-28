import Express from "express";

class DiscordBot {

    /**
     * 
     * @param {Express} app The DiscordBots express application
     * @param {string | number} PORT DiscordBot's express app will listen for this port number
     */ 
    constructor(app, PORT) {
        this.app = app;
        this.PORT = PORT;
    }

    /**
     * 
     * @param {string | number} PORT
     */
    setPort(PORT) {
        this.PORT = PORT;
    }

    // Method to listen for app on instance's port
    startApp() {
        this.app.listen(this.PORT);
    }
}

export default DiscordBot;