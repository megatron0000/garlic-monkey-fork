// @ts-check

import SessionObject from "../objects/session-object";

/**
 * 
 * @param {SessionObject} session 
 */
export default function maybeStartGame(session) {
    if (session.isMiddleGame)
        return;

    const playerCount = session.activeSockets.size;

    if (playerCount >= 4) {
        session.timerActive = true;
        session.timerId = session.activateTimer(10000); // 20 segs  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    }
    else {
        session.timerActive = false;
        if (session.timerId !== null) {
            clearTimeout(session.timerId);
            session.timerId = null;
        }
    }
}