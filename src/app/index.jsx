import React from 'react';
import {render} from 'react-dom';

import {PageTest} from './FullPage';
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
