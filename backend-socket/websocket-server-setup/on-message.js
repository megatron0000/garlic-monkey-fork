import parseMessage from '../library/message-spec';
import activeSessions from '../objects/active-sessions';
import mainLogic from '../library/main-logic';

export default function onMessage(data, isBinary, ws) {

    // TODO is it possible that ws.sID refers to a session that does not exist anymore ?
    // if (ws.sID >= activeSessionsArr.length) //safety, don't try to access indexes that don't exist //<<<<<<<<<<<<< TODO: MAYBE REMOVE THIS
    //     return null;

    console.log("received message from ws id = " + ws.sID);

    const message = parseMessage(data);

    if (!message) {
        return null;
    }

    // TODO: MAYBE REMOVE THIS (is this case possible at all ?)
    if (!activeSessions.has(ws.sID)) {
        console.log('ERROR -->> on-message.js -->> socket message in finished session');
        return null;
    }

    // TODO: this should now be impossible
    // case -1: //socket does not belong to session
    //         console.log('ERROR -->> on-message.js -->> socket message in wrong session(wrong ws.sID)');
    //         return null;


    const session = activeSessions.get(w.sID);

    // Either ws is active or waiting
    if (session.activeSockets.has(ws)) {
        mainLogic(session, message, ws, true);
    }
    else {
        mainLogic(session, message, ws, false);
    }
    
};

//TODO: socket status checker before send