import SessionObject from "../objects/session-object";
import activeSessions from "../objects/active-sessions"

function terminateWsWithError(ws, code, message) {
    ws.close(code, message);
    ws.terminate();
}

export default function onConnection(ws, req) {

    const reqHeaders = req.headers['sec-websocket-protocol'];

    if (typeof reqHeaders !== "string") {
        terminateWsWithError(1002, 'invalid subprotocols');
        return false; // TODO why return false ?
    }

    const [sessionName, garlicName, ...rest] = reqHeaders.split(', ');

    if (rest.length !== 0) {
        terminateWsWithError(1002, 'invalid subprotocols count');
        return false;
    }

    if (typeof sessionName !== "string" || typeof garlicName !== "string") {
        terminateWsWithError(1003, 'invalid subprotocols type');
        return false;
    }

    if (activeSessions.has(sessionName)) {
        const session = activeSessions.get(sessionName);

        if (session.activeSockets.size <= 6) {
            session.activeSockets.add(ws);
        }
        else {
            session.waitingSockets.add(ws);
        }
    }
    else {
        activeSessions.add(new SessionObject(ws, sessionName));
    }


    // TODO refactor to remove these custom properties from the websocket instance
    ws.sID = sessionName;
    ws.garlicName = garlicName;
    ws.isAlive = true;
};

//TODO: send match data and MAYBE check if player name
//TODO: assign to waiting players that connect middle-game