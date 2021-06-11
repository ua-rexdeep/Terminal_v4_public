const {DEBUG} = require("../Util");

class Department {
    constructor(Server, ID, Alias, Title, Color, Template, Roles) {
        this.Server = Server;
        this.ID = ID;
        this.Alias = Alias;
        this.Title = Title;
        this.Color = Color;
        this.Template = Template;
        this.Roles = Roles.map(role=>this.Server.Discord.roles.cache.get(role));

        DEBUG(`Department:${Title}`, `Loaded ${this.Roles.length} roles.`)
    }

    share() {
        return {
            ID: this.ID,
            Title: this.Title,
            Alias: this.Alias,
            Color: this.Color,
            Template: this.Template,
        }
    }

}

module.exports = class DepartmentManager {
    constructor(Server) {
        MySQL.select("departments", {Server: Server.ID}).then(departments=>{
            this.Departments = departments.map(department=>new Department(Server, department.ID, department.Alias, department.Title, department.Color, department.Template, department.Roles))
        })
    }

    get(ID) {
        return this.Departments.find(department => department.ID === ID);
    }

    role(roleID) {
        return this.Departments.filter(department=>department.Roles.find(role=>role.id===roleID))
    }

    share() {
        return this.Departments.map(department=>department.share())
    }

}