const DiscordJS = require('discord.js');
const {LOG, DEBUG, parse, toString, ID, messageColor, red, magenta, green, yellow, encodeDiscordSecret} = require(`../Util.js`);
const DiscordBot = new DiscordJS.Client({ws: { intents: DiscordJS.Intents.ALL }});

let bot = new DiscordJS.Client({ws: { intents: DiscordJS.Intents.ALL }})

exports.ready = function(key) {
    return new Promise((res, rej)=>{
        bot.login(key);

        this.isReady = false;

        bot.on("ready", function(){
            LOG(`Discord`,`Bot ${bot.user.username} ready.`)
            res(bot);
        })
    })
}

exports.bot = bot;

exports.user = function (userID) {
    return this.bot.users.cache.get(userID);
}

exports.member =  function (memberID, gID = null) {
    let member = null;
    bot.guilds.cache.forEach((g)=>{
        if(!member&&(gID==null||gID==g.id)) member = g.members.cache.get(memberID)
    })
    return member;
}

exports.channel =  function (channelID) {
    let channel = null;
    bot.guilds.cache.forEach((g)=>{
        if(!channel) channel = g.channels.cache.get(channelID)
    })
    return channel;
}

exports.role = function (roleID) {
    let role = null;
    bot.guilds.cache.forEach((g)=>{
        if(!role) role = g.roles.cache.get(roleID)
    })
    return role;
}

exports.guild =  function (guildID) {
    return bot.guilds.cache.find(x=>x.id==guildID)
}