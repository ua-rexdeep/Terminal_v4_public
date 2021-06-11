const {encodeDiscordSecret, red, toString} = require("../Util")
const {DEBUG} = require("../Util");

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());
const http = require('http');
const server = http.createServer(app);
const Socket = require("socket.io")(server);

exports.ExpressServer = server;
exports.Socket = Socket;
exports.Express = app;

app.get('/api', (req, res) => {
    if(!req.query||!req.query.eventName) return res.end(`QUERY HAVE NOT EVENT`)
    console.log(req.query);
})

app.get('/handshake', (req, res) => {
    res.end(toString({
        ip: global.Settings.Host,
    }))
})

app.get('/meow', (req, res)=>{
    setTimeout(() => {
        res.status(504).send()
    }, 3000);
})

/**
 * @TODO Сделать авторизацию
 */
app.get('/DiscordAuthentication', (req, response) => {
    if(req.query&&req.query.code){

        fetch(`https://discordapp.com/api/oauth2/token`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encodeDiscordSecret({
                'client_id': `700966175164596314`,
                'client_secret': `JfVphUEcIZswqupg8e2YzWFuCmZt9eNl`,
                'grant_type': 'authorization_code',
                'code': req.query.code,
                'redirect_uri': `http://rexdeep.ru/DiscordAuthentication`,
                'scope': 'identify guilds guilds.join'
            })
        }).then(r=>r.json().then(res=>{
            if(res.error==null) {

                fetch(`http://discordapp.com/api/users/@me`, {headers: {Authorization: `Bearer ${res.access_token}`}}).then(r=>r.json().then(member=>{
                    console.log(`>>>>>>>>>>>>>>>>>>>`)
                    // у тебя есть класс member
                    console.log(`<<<<<<<<<<<<<<<<<<<<`)
                    response.redirect('http://rexdeep.ru/meow');
                }));

            } else response.redirect(`https://discord.com/api/oauth2/authorize?client_id=700966175164596314&redirect_uri=http%3A%2F%2Frexdeep.ru%2FDiscordAuthentication&response_type=code&scope=identify%20guilds%20guilds.join`)
        }));
    } else response.end(501);
})



// app.get(/^\/[a-zA-Z0-9-_@]{0,128}$/, (req, res)=>{
//     req.originalUrl = req.originalUrl.slice(1,req.originalUrl.length);
//     global.OnWebClientConnected(req,res);
//     // res.sendStatus(403).send();
// })
//
// app.get(/[a-zA-Z0-9-_.]{3,50}.(js|scss|css|html|php|png|jpg|svg|ttf|map|rar|jar|vue)/, (req, res) => {
//     if(global.Settings.Locked) return res.status(504).send()
//     let ip = getRequestIP(req);
//     console.log(ip, path.resolve(__dirname+"/../source"+req.originalUrl))
//     let p = path.resolve(__dirname+"/../source"+req.originalUrl);
//     if(fs.existsSync(p)) res.sendFile(p);
//     else {
//         console.error(red(`Source file ${p} not exists. || ${getRequestIP(req)} || ${req.query.source}`));
//         res.status(504).send()
//     }
// });

app.use(express.static(path.join(__dirname, '/../Client/build')));

app.get('*', (req,res) => {
    if(req.url == '/main') req.url = 'index.html'
    res.sendFile(path.join(__dirname+'/../Client/build/'+req.url));
});