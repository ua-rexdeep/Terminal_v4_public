import React, { useEffect, useState } from "react";

import Service from './Service'
import LoadingBackground from "./Components/LoadingBackground";
import Main from "./Components/Main";
import Terminal from "./Components/Terminal";

Service.Connect(`localhost:2533`); //rexdeep.ru
Service.OnBroadcast = function(data) {
  console.warn(`OnBroadcast`, data);

}

let BlockActions = false;

export default function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    Service.OnBroadcast = function(data) {
      console.warn(`OnBroadcast`, data);
      setResponse(data);
    }
  }, []);

  return ( <React.Fragment>
    <title>{ response.sheet !== undefined
              && response.sheet !== 'loading'
              && response.sheet !== 'main'
              && response.sheet !== 'redirect' ? `${response.server.Title} - ` : '' }Mobile Data Table / Control Aided Dispatch</title>


    { (BlockActions || !Service.isSocketAvailable || Service.SocketRequests.length>0) && <div id="AnyRequestLoading" className={"blinkfull"}>
      { BlockActions && <span>Working..</span> }
      { Service.SocketRequests.length>0 && <span>Waiting response...</span> }
      { !Service.isSocketAvailable && <span style={{color: '#d62d20'}}>Connection losted.</span> }
    </div> }

    { (BlockActions || (!Service.isSocketAvailable)) && <div style={{width: '100%', height: '100%', position: 'fixed', 'zIndex': 1,background: '#0000007a'}}/> }

    <LoadingBackground sheet={response.sheet}/>

    { response.sheet === 'main' && <Main servers={response.servers} user={response.user} /> }

    { response.sheet !== undefined
      && response.sheet !== 'loading'
      && response.sheet !== 'main'
      && response.sheet !== 'redirect' && <Terminal information={response} />}
  </React.Fragment> )
}