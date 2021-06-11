import openSocket from 'socket.io-client';
import {LOG} from "./Utils";
import update from "./index";
export default new class Service {
    constructor() {
        this.isDataFirstLoaded = false;

        console.log(`SERVICE`)

        this.SocketRequests = [];

        this.api_key = "";

        this.isSocketAvailable = false;

        this.Socket = null;

        this.OnBroadcast = (data) => {};
    }

    API(eventName, eventData) {
        return new Promise((res,rej)=>{
            eventData = eventData || {};
            eventData.Event = eventName;

            let response_id = this.SocketRequests.findIndex(x=>x==null) === -1 ? this.SocketRequests.length : this.SocketRequests.findIndex(x=>x==null);
            eventData.response_id = response_id;
            this.SocketRequests[response_id] = res;

            this.Socket.emit('api', eventData);
        })
    }

    Connect(link) {
        LOG(`Socket.IO`,`Trying ws://${link}`)
        this.Socket = openSocket('ws://'+link, {
            'reconnection': false
        });

        this.Socket.on(`connect_error`, () => setTimeout(()=>this.Connect(link), 1000))

        this.Socket.on('connect', () => {
            LOG('Socket.IO',`connected to ${link}`);
            this.SocketRequests = [];
            this.isSocketAvailable = true;
            update();
        });

        this.Socket.on('disconnect', () => {
            console.log("disconnected:(")
            this.isSocketAvailable = false;
            update();
            setTimeout(()=>this.Connect(link), 1000)
        });

        this.Socket.on('update_key', key => this.api_key = key);

        this.Socket.on('broadcast', (data)=>{
            this.OnBroadcast(data);
        })

        this.Socket.on('response', (data) => {
            if(!this.SocketRequests[data.response_id]) return false;
            this.SocketRequests[data.response_id](data)
            this.SocketRequests[data.response_id] = null;
        });
    }
}();