const {LOG, DEBUG, parse, toString, ID, red, magenta, green, yellow} = require(`../Util.js`);

module.exports = class Client {
    constructor(ip = '0.0.0.0', account = 'ACCOUNT_IDENTIFIER', sheet = 'main') {
        DEBUG(`new Client(${ip})`);
        this.ip = ip;
        this.user = AccountManager.get(account)

        this.isSessionRegistered = !!account;

        if(this.account) {
            DEBUG(`Client`, `${ip} - authenticated as ${this.account.Discord.username}`)
        }

        this._sheet = sheet;
        this.server = sheet !== 'main' ? ServerManager.get(sheet) : null;
        this.api_key = null;

        this.connection = null;
        this._online = false;
    }

    get account () { return this.user }

    /**
     * TODO: isSessionRegistered - insert
     * @param acc
     */
    set account (acc) {
        this.user = acc;
        MySQL.update('sessions', {account: acc.ID}, `ip = '${this.ip}'`).then(r => {})
        DEBUG(`Client`, `${this.ip} - authenticated as ${this.account.Discord.username}`)
    }

    get sheet () { return this._sheet }

    /**
     * TODO: isSessionRegistered - insert
     * @param page
     */
    set sheet (page) {
        this._sheet = page;
        MySQL.update('sessions', {sheet: page}, `ip = '${this.ip}'`).then(r => {})
    }

    /**
     * @param {Boolean} status
     */
    set online(status) {
        LOG(`Client:${this.ip}`,`${this.Name()||this.ip} now ${status?green('online'):red('offline')}`)
        this._online = status;
    }

    get online() { return this._online; }

    Name() {
        return this.account && this.account.Discord.username
    }

    /**
     * @param {String} eventName
     * @param {Object?} eventData
     */
    send(eventName, eventData) {
        LOG(`Client:${this.ip}:send`,`${eventName} | Online: ${this.online?'yes':'no'}`)
        this.online ? this.connection.emit(eventName, eventData) : {error: true, reason: `user now offline`};
    }

    updateApiKey() {
        this.api_key = ID(20, "0123456789qwertyuiopasdfghjklzxcvbnm_-+=!$%&");
        this.send(`update_key`, this.api_key);
    }

    broadcast() {
        let data = {};
        data.sheet = this.sheet
        if(this.account) {
            data.user = this.account.share();
            if(data.sheet === 'main') data.servers = ServerManager.UserServers(this.account)
            else {
                data.server = this.server.share();
                data.units = this.server.Members.share();
                data.unit = data.units.find(x=>x.User==this.account.ID);
            }
        }
        this.send(`broadcast`, data);
    }
}