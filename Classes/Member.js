const {LOG, DEBUG, parse, toString, ID, red, magenta, green, yellow} = require(`../Util.js`);

module.exports = class Member {
    constructor(Server, User, Person, Sign, Department, GameID) {
        this.Server = Server;
        this.User = User;
        this.Person = Person;
        this.Rank = "Sergeant";
        this.Sign = Sign;
        this.Department = this.Server.Departments.get(Department);
        this.GameID = GameID;
    }

    share() {
        return {
            Server: this.Server.ID,
            User: this.User.ID,
            Rank: this.Rank,
            Person: this.Person,
            Sign: this.Sign,
            Department: this.Department.share(),
            GameID: this.GameID,
        }
    }
}