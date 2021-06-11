import Service from "../Service";

export default function AvailableServersList(props) {
    return props.servers.map(server=>
        <div key={server.Title} className="availableServerBlock" onClick={()=> requestPage(server)}>
            <div style={{background: 'center / cover no-repeat url(' + server.Icon + ')', width: '2vw', height: '2vw', 'borderRadius': '4px', border: '2px solid #444', 'marginRight': '0.5vw'}} />
            <div style={{display: 'inline'}}>
                <span>{server.Title}</span> <span style={{color: "#8c8c8c"}}>(Total - {server.Statistic.AllUnits}, Active - {server.Statistic.ActiveUnits})</span>

                <div>
                    { server.Access === 'unit' && <span style={{fontSize: "1.4vh", color: "#8c8c8c"}}>{server.Unit.Rank} {server.Unit.Department} - {server.Unit.Sign} {server.Unit.Person}</span> }
                    { server.Access === 'role' && <span style={{fontSize: "1.4vh", color: "#8c8c8c"}}>Вы ещё не посещали этот сервер.</span> }
                    { server.Access === 'denied' && <span style={{fontSize: "1.4vh", color: "#8c8c8c"}}>Нет доступа к серверу.</span>}
                </div>
            </div>
        </div>
    )
}

function requestPage(server) {
    Service.API(`requestPage`, {page: server.ID}).then(r => {})
}