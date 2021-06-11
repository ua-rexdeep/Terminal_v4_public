global.fs = require('fs');
global.path = require('path');

global.Settings = require("./config.json");

const {ExpressServer, Socket} = require("./Modules/ExpressService");
require('./Modules/SocketService')(Socket);

const {LOG, DEBUG, parse, toString, messageColor, red, magenta, green, yellow} = require(`./Util`);

global.MySQL = require(`./Modules/DataManager`);

global.Discord = require(`./Modules/Discord`);
Discord.ready(Settings.DiscordToken).then(async ()=>{
    let AccountManager = require(`./Modules/AccountManager`);
    let ClientManager = require(`./Modules/ClientManager`);
    let ServerManager = require(`./Modules/ServerManager`);

    console.log(yellow(`----------------------------------------------------`));

    await MySQL.select("accounts").then(accounts => { global.AccountManager = new AccountManager(accounts); })

    console.log(yellow(`----------------------------------------------------`));

    await MySQL.select("servers").then(servers => { global.ServerManager = new ServerManager(servers); })

    console.log(yellow(`----------------------------------------------------`));

    await MySQL.select("sessions").then(sessions => { global.ClientManager = new ClientManager(sessions); })

    console.log(yellow(`----------------------------------------------------`));

    ExpressServer.listen(2533, ServerWasStarted);
})

global.OnWebClientConnected = function(request, response) {
    DEBUG(`Express:app.get(${request.originalUrl})`)
    let session = ClientManager.add(getRequestIP(request));
    if(session) {
        if(session.sheet === 'main') response.sendFile(__dirname+`/templates/main.html`);
        else if(session.sheet === 'controlpanel'&&session.server) response.sendFile(__dirname+`/templates/controlpanel.html`);
        else if(session.server) response.sendFile(__dirname+`/templates/mdt.html`);
        else response.status(503).send()
    } else response.sendFile(__dirname+`/templates/main.html`);
};

const ServerWasStarted = () => {
    for(let i = 0; i<2;i++) console.log();
    console.log("---------------------------------------------------")
    console.log("|                                                 |")
    console.log(`|   Started on: ${new Date().toLocaleString()}             |`)
    console.log(`|   Server address: ${Settings.Host}:${Settings.Port}               |`)
    console.log(`|   Discord: ${Discord.bot.user.username} @${Discord.bot.user.id}     |`)
    console.log("|                                                 |")
    console.log("---------------------------------------------------")
    for(let i = 0; i<2;i++) console.log();
}

///////////////////////////////////////////////////////////////////////////
//                                                                       //
//                                CLASSES                                //
//                                                                       //
///////////////////////////////////////////////////////////////////////////

global.getRequestIP = function() { return "91.192.182"; }

global.getForwardIP = function() { return "91.192.182" }

Wait = (time) => new Promise((res,rej)=>setTimeout(res, time));

process.on('uncaughtException', function(err) {
    console.error(messageColor.FgRed, 'Killed by error', err.stack, messageColor.Reset)
    process.exit()
});