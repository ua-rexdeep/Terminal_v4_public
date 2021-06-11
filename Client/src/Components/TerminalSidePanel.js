const UnitStatusColors = {
    available: '#4caf50',
    unavailable: '#525252',
    busy: '#d28800',
    enroute: '#2196f3',
    incallout: '#2196f3',
}

let NCICSearch = "";

export default function TerminalSidePanel(props) {
    let info = props.information;
    let server = info.server;
    let unit = info.unit;
    let units = info.units;

    return <div id={"SidePanel"}>
        <div className="PanelTitle" style={{float: 'right'}}>{unit.sign}</div>
        <div className="PanelTitle">Status</div>
        <div>
            <button style={{background: unit.status === 'available' && UnitStatusColors[unit.status], width: '45%'}} className="status">Available</button>
            <button style={{background: unit.status === 'unavailable' && UnitStatusColors[unit.status], width: '45%', float: 'right'}} className="status">Unavailable</button>
        </div>
        <div style={{textAlign: 'center', fontSize: '1.8vh', display: 'flex', justifyContent: 'center'}}>
            <button style={{background: unit.status === 'busy' && UnitStatusColors[unit.status], width: '-webkit-fill-available' }} className="status">Busy</button>
            <button style={{background: unit.status === 'enroute' && UnitStatusColors[unit.status], width: '-webkit-fill-available', margin: '2% 1vw' }} className="status">En route</button>
            <button style={{background: unit.status === 'incallout' && UnitStatusColors[unit.status], width: '-webkit-fill-available' }} className="status">In callout</button>
        </div>

        <hr />

        <p style={{marginBottom: '0', textAlign: 'center'}}>NCIC Search</p>
        <input type="text" onChange={(event) =>{ NCICSearch=event.target.value }} style={{width: '-webkit-fill-available'}} placeholder="Enter search information" />
    </div>
}