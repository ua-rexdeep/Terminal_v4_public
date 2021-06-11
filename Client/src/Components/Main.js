import AvailableServersList from "./AvailableServersList";

function openAuthenticationWindow () {

}

function DiscordAuthentication() {
    return <p onClick={()=>openAuthenticationWindow()}>NULL</p>;
}

export default function Main(props) {
    return (<div>
        <div id="head">

            <div> <span>REXDEEP.RU Projects</span> </div>

            <div style={{float: "right"}}>
                <span>Discord: [UA] ReXDeep#5857</span>
            </div>

        </div>

        <div id="body">
            <div className="body_content_block">
                #content
            </div>

            <div style={{background: '#333',margin: '4vh 0', width: '23%', padding: '1vh 1vw', 'borderRadius': '4px'}}>
                { (props.user && <div>
                    <p style={{textAlign: 'center'}}>Available servers</p> <AvailableServersList servers={props.servers}/>
                </div>) || <DiscordAuthentication />}
            </div>

        </div>
    </div>)
}