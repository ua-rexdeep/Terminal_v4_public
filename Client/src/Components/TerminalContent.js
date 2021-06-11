import {s} from "../Utils";

function ContentTabs() {
    return (
        <ul className="content_tabs">
            {/*<li v-for="tab,id in tabsStorage" @click="openTab(id)"><div>{{tab.methods&&tab.methods.slic||tab.title}}</div> <span style="float:right;color:gray;">[X]</span></li>*/}
        </ul>
    )
}

export default function TerminalContent(props) {
    let info = props.information;
    let server = info.server;
    let unit = info.unit;

    return <div id={"Content"}>
        <div className="content_general">

            <ContentTabs />

            <div>Server: {s(server)}</div>
            <div>Unit: {s(unit)}</div>
        </div>
    </div>
}