import SessionObject from "../objects/session-object";
import { participationFeedbackMessage } from "./message-spec";
import maybeStartGame from "./should-game-start-checker";

/**
 * 
 * @param {SessionObject} session
 * @param {import("./message-spec").ParticipationStatusMessage} message 
 * @param {*} ws 
 */
export default function partLogic(session, message, ws) {
    if (message.msgContent === true) { //player wants to play
        //if player is already on active sockets do nothing, else move to active if there's an empty place
        if (session.activeSockets.has(ws)) {
            return;
        }

        // add player only if there is space available
        if (session.activeSockets.size > 6) {
            ws.send(JSON.stringify(participationFeedbackMessage(false, 'no empty place for players')));
        }
        else {
            session.activeSockets.add(ws);
            ws.send(JSON.stringify(participationFeedbackMessage(true, 'player succesfully placed on game')));
            maybeStartGame(session);
        }
    }
    else { //player doesn't want to play

        // TODO check if we should really remove the player from the active sockets
        if (session.activeSockets.has(ws)) {
            session.activeSockets.delete(ws);
        }

        if (!session.waitingSockets.has(ws)) {
            session.waitingSockets.add(ws);
        }


        // TODO is this necessary ?
        // if (isWsActive)
        //     maybeStartGame(session);
    }
}