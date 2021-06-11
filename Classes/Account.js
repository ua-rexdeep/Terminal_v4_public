const {LOG, DEBUG, parse, toString, ID, red, magenta, green, yellow} = require(`../Util.js`);

module.exports = class Account {
    /**
     * @param {String} ID
     * @param {Number} Discord
     * @param {Object} Permissions
     * @param {Array<Object>} Audit
     * @param {Object} Settings
     * @param {String} ServiceLevel
     */
    constructor(ID, Discord, Permissions, Audit, Settings, ServiceLevel) {
        this.ID = ID;
        this.Discord = global.Discord.user(Discord);
        this.Permissions = Permissions;
        this.Audit = Audit;
        this.Settings = Settings;
        this.ServiceLevel = ServiceLevel;
    }

    Name() { return this.Discord.username }

    share() {
        return {
            ID: this.ID,
            Name: this.Discord.username,
            Discord: {
                ID: this.Discord.id,
                Tag: this.Discord.tag,
            },
            Settings: this.Settings,
        }
    }
}