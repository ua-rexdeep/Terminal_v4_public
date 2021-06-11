const Client = require("../Classes/Client");

module.exports.RequestSheet = function RequestSheet(Client, Event, Response) {
    let sheet = 'main';
    console.log(ServerManager.get(Event.page).getUserHaveAccess(Client.account))
    if(Event.page !== "main" && ServerManager.get(Event.page) && ServerManager.get(Event.page).getUserHaveAccess(Client.account) === 'unit') {
        sheet = Event.page;
    }
    Client.server = ServerManager.get(Event.page);
    Client.sheet = sheet;
    Client.broadcast();
    Response(sheet);
}