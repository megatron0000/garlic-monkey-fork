// @ts-check

import SessionObject from "../objects/session-object";
import chatLogic from "./chat-logic";
import { devReportMessage } from "./message-spec";
import partLogic from "./participation-status";


/**
 * 
 * @param {SessionObject} session
 * @param {import("./message-spec").Message} message 
 * @param {*} ws 
 */
export default function mainLogic(session, message, ws) {
    switch (message.msgType) {

        case 'chatNew':
            chatLogic(session, message, ws);
            return;

        case 'newData':
            if (!session.activeSockets.has(ws)) { //inactive sockets can only chat
                ws.send(JSON.stringify(devReportMessage('DENIED: player on waiting line tried sending "newData" msgType')));
                return;
            }

            // game logic here

            console.log("main-logic.js --> 'newData' received");
            return;

        case 'participationStatus': //changes player status if possible
            console.log("main-logic.js --> 'participationStatus' received");
            partLogic(session, message, ws);
            console.log("main-logic.js --> 'participationStatus' processed");
            return;

        default:
            console.log("ERROR --> main-logic.js --> msgType of received data is invalid");
            return;
    }
}

//TODO: TIMER, REPLAYER, CHANGE WAITING/PLAYING, DISCONNECTOR