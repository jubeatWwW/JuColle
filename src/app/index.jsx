import React from 'react';
import {render} from 'react-dom';

import MainMenuHex from './MainMenuHex';
import '../css/index.scss';

class App extends React.Component {

    render() {
        return <MainMenuHex /> ;
    }
};

render(<App />, document.getElementById('container'));
