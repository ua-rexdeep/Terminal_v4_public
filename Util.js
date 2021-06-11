exports.LOG = function LOG(message, item) {
    let string = `${messageColor.FgMagenta}[${new Date().toLocaleTimeString()}${item?(", "+message):""}${messageColor.FgMagenta}] ${messageColor.FgWhite}${item?item:message}`;
    console.log(string, typeof(message)=="object"?message:"");
}

exports.DEBUG = (...args) => {
    console.log(exports.green(`[DEBUG]`),...args,messageColor.Reset)
}

exports.parse = JSON.parse;

exports.toString = JSON.stringify;

exports.ID = function(length = 20, c = '0123456789QWERTYUIOPASDFGHJKLZXCVBNM') {
    let string = '';
    let found = true;
    let times = 0;
    while(found) {
        if(times>=20) {
            DEBUG(red(`global.ID try generate ID >= 20 times.`))
            break;
        }
        times++;
        string = '';
        found = false;
        for(let i = 0; i < length; i++) {
            string+=c[parseInt(Math.random()*c.length)];
        }
    }
    return string;
}

messageColor = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",
    text: {
        Black: "\x1b[30m",
        Red: "\x1b[31m",
        Green: "\x1b[32m",
        Yellow: "\x1b[33m",
        Blue: "\x1b[34m",
        Magenta: "\x1b[35m",
        Cyan: "\x1b[36m",
        White: "\x1b[37m",
    },
    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m",
    bg: {
        Black: "\x1b[40m",
        Red: "\x1b[41m",
        Green: "\x1b[42m",
        Yellow: "\x1b[43m",
        Blue: "\x1b[44m",
        Magenta: "\x1b[45m",
        Cyan: "\x1b[46m",
        White: "\x1b[47m",
    }
}

exports.messageColor = messageColor;

exports.red = (m) => `${messageColor.text.Red}${m}${messageColor.Reset}`;
exports.magenta = (m) => `${messageColor.text.Magenta}${m}${messageColor.Reset}`;
exports.green = (m) => `${messageColor.text.Green}${m}${messageColor.Reset}`;
exports.yellow = (m) => `${messageColor.text.Yellow}${m}${messageColor.Reset}`;

exports.encodeDiscordSecret = function(obj) {
    let string = "";

    for (let [key, value] of Object.entries(obj)) {
        if (!value) continue;
        string += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }

    return string.substring(1);
}