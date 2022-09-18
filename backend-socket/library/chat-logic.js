// @ts-check

import SessionObject from "../objects/session-object";
import { chatUpdateMessage } from "./message-spec";

/**
 * 
 * @param {SessionObject} session
 * @param {import("./message-spec").ChatNewMessage} message 
 * @param {*} ws 
 */
export default function chatLogic(session, message, ws) {
    session.chat.push({ nick: ws.garlicName, msgContent: message.msgContent });

    session.activeSockets.forEach(ws => { //send new msg to all players in session
        ws.send(JSON.stringify(chatUpdateMessage(ws.garlicName, message.msgContent)));
    });

    session.waitingSockets.forEach(ws => { //send new msg to all players in session
        ws.send(JSON.stringify(chatUpdateMessage(ws.garlicName, message.msgContent)));
    });
}