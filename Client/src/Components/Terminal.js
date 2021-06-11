import React from "react";
import TerminalSidePanel from "./TerminalSidePanel";
import TerminalContent from "./TerminalContent";

export default function Terminal (props) {
    let info = props.information;
    let server = info.server;
    let unit = info.unit;
    let user = info.user;

    return <React.Fragment>

        <div id="head" style={{padding: '0.5vh 2vw', background: '#313131'}}>
            <div className="mark">
                <span>
                    <span style={{color: 'red'}}>\</span>&gt;  TERMINAL
                </span>
                <i id="terminalIcon" aria-hidden="true" className="fas fa-wifi anim-wifi" style={{transform: 'rotate(45deg)', position: 'relative', fontSize: '1.4vh', top: '-6px', left: '-10px'}} />
            </div>

            <button style={{margin: '0 3vw 0 5vw', padding: '1vh 0', width: '16vw', background: '#222'}}>{unit.Department.Title}</button>

            <div style={{margin: '0 8vw', fontSize: '1.7vh'}}>MDT / CAD CMS</div>

            <div style={{fontSize: '1.7vh'}} id="date">{new Date().toLocaleDateString()}</div>
            <div style={{fontSize: '1.7vh', marginLeft: '2vw'}} id="time">{new Date().toLocaleTimeString()}</div>

            <div style={{margin: '1.2vh', float: 'right', fontSize: '1.7vh', cursor: "pointer", borderBottom: '2px solid #616161'}}>{server.Title}</div>

        </div>

        <div id="body" style={{overflowY: 'auto', height: '93.5%', width: '100%', display: 'inline-block'}}>
            <TerminalSidePanel information={info} />
            <TerminalContent information={info} />



            <div id={"Footer"}>
                <div>CMS {'#version'} {'#version_date'}</div>
                <div>{user.Name}</div>
                <span>• Logout</span>
                <span>• Report a trouble</span>
            </div>
        </div>
    </React.Fragment>
}