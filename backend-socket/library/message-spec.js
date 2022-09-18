// @ts-check

import { Type } from "@sinclair/typebox"
import { TypeCompiler } from '@sinclair/typebox/compiler'


/**
 * @template T
 * @typedef {import("@sinclair/typebox").Static<T>} Static<T>
 */

const ChatNewMessageType = Type.Object({
    msgType: Type.Literal('chatNew'),
    msgContent: Type.String()
})

const NewDataMessageType = Type.Object({
    msgType: Type.Literal('newData'),
    msgContent: Type.String() // TODO define msgContent
})

const ParticipationStatusMessageType = Type.Object({
    msgType: Type.Literal('participationStatus'),
    msgContent: Type.Boolean()
})

const DevReportMessageType = Type.Object({
    msgType: Type.Literal('devReport'),
    msgContent: Type.Object({ report: Type.String() })
})

const ParticipationFeedbackMessageType = Type.Object({
    msgType: Type.Literal('participationFeedback'),
    msgContent: Type.Object({
        succeeded: Type.Boolean(),
        feedback: Type.String()
    })
})

const ChatUpdateMessageType = Type.Object({
    msgType: Type.Literal('chatUpdate'),
    msgContent: Type.Object({
        nick: Type.String(),
        msgContent: Type.String()
    })
})


/**
 * @typedef {Static<ChatNewMessageType>} ChatNewMessage
 * @typedef {Static<NewDataMessageType>} NewDataMessage
 * @typedef {Static<ParticipationStatusMessageType>} ParticipationStatusMessage
 * @typedef {Static<DevReportMessageType>} DevReportMessage
 * @typedef {Static<ParticipationFeedbackMessageType>} ParticipationFeedbackMessage
 * @typedef {Static<ChatUpdateMessageType>} ChatUpdateMessage
 */

/**
 * @param {string} msgContent
 * @returns {ChatNewMessage}
 */
export function chatNewMessage(msgContent) {
    return { msgType: 'chatNew', msgContent }
}

/**
 * @param {string} msgContent
 * @returns {NewDataMessage}
 */
export function newDataMessage(msgContent) {
    return { msgType: 'newData', msgContent }
}

/**
 * @param {boolean} wantsToPlay
 * @returns {ParticipationStatusMessage}
 */
export function participationStatusMessage(wantsToPlay) {
    return { msgType: 'participationStatus', msgContent: wantsToPlay }
}

/**
 * @param {string} reportContent
 * @returns {DevReportMessage}
 */
export function devReportMessage(reportContent) {
    return { msgType: 'devReport', msgContent: { report: reportContent } }
}

/**
 * @param {boolean} succeeded
 * @param {string} feedback
 * @returns {ParticipationFeedbackMessage}
 */
export function participationFeedbackMessage(succeeded, feedback) {
    return {
        msgType: 'participationFeedback',
        msgContent: {
            succeeded,
            feedback
        }
    }
}


/**
 * @param {string} nick 
 * @param {string} text 
 * @returns {ChatUpdateMessage}
 */
export function chatUpdateMessage(nick, text) {
    return {
        msgType: 'chatUpdate',
        msgContent: {
            nick,
            msgContent: text
        }
    }
}



const MessageType = Type.Union([
    ChatNewMessageType,
    NewDataMessageType,
    ParticipationStatusMessageType,
    DevReportMessageType,
    ParticipationFeedbackMessageType,
    ChatUpdateMessageType
])

/**
 * @typedef {Static<MessageType>} Message
 */

const MessageTypeCheck = TypeCompiler.Compile(MessageType)


/**
 * 
 * @param {string} data 
 * @returns {Message | null}
 */
export default function parseMessage(data) {
    let parsedData;
    try {
        parsedData = JSON.parse(data);
    }
    catch (error) {
        return null;
    }

    if (MessageTypeCheck.Check(parsedData)) {
        return parsedData;
    }
    else {
        return null;
    }

}  