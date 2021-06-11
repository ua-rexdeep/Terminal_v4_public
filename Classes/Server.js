const {LOG, DEBUG, parse, toString, ID, red, magenta, green, yellow} = require(`../Util.js`);

const MemberManager = require(`../Modules/MemberManager`);
const Account = require(`./Account`);
const DepartmentManager = require("../Modules/DepartmentManager");

module.exports = class Server {
    /**
     *
     * @param {String} ID
     * @param {String} Owner
     * @param {String} Title
     * @param {String} Alias
     * @param {String} Status
     * @param {String} DiscordID
     * @param {Number} Ballance
     * @param {Number} ReservedDays
     * @param {Date} CreatedAt
     */
    constructor(ID, Owner, Title, Alias, Status, DiscordID, Ballance, ReservedDays, CreatedAt= new Date()) {
        this.ID = ID;
        this.Owner = AccountManager.get(Owner);
        this.Title = Title;
        this.Alias = Alias;
        this.Status = Status;
        this.Discord = Discord.guild(DiscordID);
        this.DiscordID = DiscordID;
        this.Ballance = Ballance;
        this.ReservedDays = ReservedDays;
        this.CreatedAt = new Date(CreatedAt);

        this.Departments = new DepartmentManager(this);

        this.Members = new MemberManager(this, () => {
            LOG(`Server:${this.Title}`,`inited. Discord: ${this.Discord.name}. Members: ${this.Members.length}. Owner: ${this.Owner.Name()}`);
        });

    }

    getIcon() {
        return this.Discord.iconURL();
    }

    /**
     *
     * @param {Account} User
     * @returns {Boolean}
     */
    getUserHaveAccess(User) {
        if(!this.Discord.members.cache.get(User.Discord.ID)) return 'denied';
        if(this.Members.get(User.ID)) return 'unit';
        else if(this.Discord.members.cache.get(User.Discord.ID).roles.cache.some(x=>this.Departments.role(x.id))) return "role";
        else return 'denied';
    }

    share() {
        return {
            ID: this.ID,
            Owner: this.Owner.ID,
            Title: this.Title,
            Status: this.Status,
            Icon: this.getIcon(),
            Statistic: {
                AllUnits: this.Members.length,
                ActiveUnits: this.Members.getActive().length,
            },
            Departments: this.Departments.share(),
        }
    }
}