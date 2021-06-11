const Member = require(`../Classes/Member`)

module.exports = class MemberManager {
    constructor(Server, ReturnMembers = () => {}) {
        MySQL.select("units", {Server: Server.ID}).then(members=>{
            this.Members = members.map(member => new Member(Server, AccountManager.get(member.User), member.Person, member.Sign, member.Department, member.GameID));
            ReturnMembers(this);
        })
    }

    get(ID) {
        return this.Members.find(member=>member.User.ID == ID);
    }

    share() { return this.Members.map(m=>m.share()) }

    getActive() {
        return this.Members.filter(member=>ClientManager.getByID(member.User.ID));
    }

    get length() {
        return this.Members.length;
    }
}