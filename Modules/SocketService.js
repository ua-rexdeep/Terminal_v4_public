const {RequestSheet} = require(`./Internal_API`);

const {DEBUG} = require("../Util");

module.exports = function(Socket){
    Socket.on('connection', (connection)=>{
        let client = ClientManager.add(getForwardIP(connection));
        client.online = true;
        client.connection = connection;

        client.broadcast();
        client.updateApiKey();

        connection.on(`api`,(request)=>{
            DEBUG(client.account.Name(), request)

            let response = function(data){
                if(typeof(data) !== "object") data = {retVal: data};

                data.response_id = request.response_id;

                client.send('response', data);
            }

            if(request.Event === 'requestPage' && client.account) RequestSheet(client, request, response);

        })

        connection.on(`disconnect`,()=>{
            client.online = false;
        })
    });
}