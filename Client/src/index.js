import React from 'react';
import {render} from 'react-dom';
import './index.css';

import App from './App';

function update() {
    render(
        <App/>,
        document.getElementById('root')
    );
}

update();

setInterval(()=>{
    update();
}, 1000)

export default update;