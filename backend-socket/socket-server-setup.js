import onConnection from "./websocket-server-setup/on-connection";
import onMessage from "./websocket-server-setup/on-message";
import onClose from "./websocket-server-setup/on-close";

export default function sockServSetup(wss) {
    wss.on('connection', (ws, req) => {
        onConnection(ws, req);
        ws.on('message', (data, isBinary) => onMessage(data, isBinary, ws));
        ws.on('close', () => onClose(ws));
    });
    wss.on('listening', () => { console.log('socket-server has been bound'); });
    wss.on('error', (error) => { console.log('---->>>> SOCKET-SERVER ERROR: '); console.log(error); });
};

//TODO: broadcaster checker



//https://localhost/
//const socket11 = new WebSocket("wss://localhost:9999",['room1','p11']);
//socket11.send(JSON.stringify({'msgType': 'chatNew', 'msgContent': 'hahahahahaahaha'}));

/*
socket11.onmessage = (event) => {
    console.log('received message from '+ this);
    console.log(event.data);
}
*/