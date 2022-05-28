import { Express } from "express";

class DiscordBot {

    /**
     * 
     * @param {Express} app 
     * @param {string | number} PORT 
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

export { DiscordBot }