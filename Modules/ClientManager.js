const Client = require(`../Classes/Client.js`);

module.exports = class ClientManager {
    /**
     * @param {Array<Object>} sessions
     * @param {String} sessions.account
     * @param {String} sessions.ip
     */
    constructor(sessions){
        this.clients = sessions.map(session=>new Client(session.ip, session.account, session.sheet));
    }

    /**
     * @param {String} ip - 0.0.0.0
     */
    add(ip) {
        if(this.get(ip)) return this.get(ip);
        let client = new Client(ip);
        this.clients.push(client);
        return client;
    }

    getByID(id) {
        return this.clients.find(client=>client.account.ID==id);
    }

    /**
     * @param {String} ip - 0.0.0.0
     */
    get(ip) {
        return this.clients.find(client=>client.ip===ip)
    }
};