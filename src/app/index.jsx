import React from 'react';
import {render} from 'react-dom';

import {PageTest} from './One-Page-Scroll';
import '../css/index.scss';

class App extends React.Component {

    render() {
        return (<div>
                <PageTest />
            </div>
                );
    }


};

render(<App />, document.getElementById('container'));
