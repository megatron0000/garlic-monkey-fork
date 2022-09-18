// @ts-check

export default class SessionObject {
    constructor(creatorWs, sessionName) {
        this.sessionName = sessionName;
        this.isFinished = false;
        this.isMiddleGame = false;
        this.firstTimerOver = false;
        this.timerActive = false;
        this.timerId = null;
        this.activeSockets = new Set([creatorWs]);
        this.waitingSockets = new Set();
        this.game = [];
        this.chat = []; //chat will be an array of objects, each object with "player name" and "message content" info as properties
    };
    activateTimer(time) {
        this.timerActive = true;
        return setTimeout(() => { console.log('timer expired'); }, time); //5 segs for testing
    }
};