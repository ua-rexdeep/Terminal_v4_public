const {LOG, DEBUG, parse, toString, ID, red, magenta, green, yellow} = require(`../Util.js`);

const Server = require(`../Classes/Server`);

module.exports = class ServerManager {
    /**
     *
     */
    constructor(servers){
        this.servers = servers.map(server=>
            new Server(
                server.ID,
                server.Owner,
                server.Title,
                server.Alias,
                server.Status,
                server.DiscordID,
                server.Ballance,
                server.ReservedDays,
                server.CreatedAt));
        LOG(`ServerManager`,`Loaded ${this.servers.length} servers.`);
    }

    /**
     * @param {String} ID
     */
    get(ID) {
        return this.servers.find(server=>server.ID === ID);
    }

    UserServers(User) {
        return this.servers.filter(server=>server.getUserHaveAccess(User)).map(server=>{
            let share = server.share();
            share.Access = server.getUserHaveAccess(User);
            share.Unit = server.Members.get(User.ID).share();
            return share;
        })
    }
};