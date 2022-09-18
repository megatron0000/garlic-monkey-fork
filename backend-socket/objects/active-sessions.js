// @ts-check 

import SessionObject from "./session-object"

class ActiveSessions {
    /** @type {Map<string, SessionObject>} */
    #sessionName2Session = new Map()

    add({ name, session }) {
        this.#sessionName2Session.set(name, session)
    }

    has(sessionName) {
        return this.#sessionName2Session.has(sessionName)
    }

    get(sessionName) {
        return this.#sessionName2Session.get(sessionName)
    }

    delete(sessionName) {
        return this.#sessionName2Session.delete(sessionName)
    }

    size() {
        return this.#sessionName2Session.size
    }
}

const activeSessions = new ActiveSessions()
export default activeSessions