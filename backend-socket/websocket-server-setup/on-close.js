import maybeStartGame from '../library/should-game-start-checker.js';
import activeSessions from "../objects/active-sessions"

module.exports = function onClose(ws) {
    ws.isAlive = false;

    const session = activeSessions.get(ws.sID); // TODO: is it possible that session === undefined ?

    // ws is either active or waiting
    if (session.activeSockets.has(ws)) {
        session.activeSockets.delete(ws);
        maybeStartGame(session); // TODO: is this necessary here ?
    }
    else {
        session.waitingSockets.delete(ws);
    }

    ws.terminate();
};

//TODO cancel timer for game start
//TODO quiter status for sockets that quit middle game