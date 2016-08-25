import React from 'react';
import {render} from 'react-dom';

import HexagonBtn from './HexagonBtn';
import '../css/index.scss';

class App extends React.Component {

    render() {
        return <HexagonBtn /> ;
    }
};

render(<App />, document.getElementById('container'));
