import React from 'react';
import {render} from 'react-dom';

import OnePageScroll from './One-Page-Scroll';
import {HexagonHollowBtns, HexagonHollowBtn, HexagonSolidBtn, HexagonTransformBtn, HexagonTransformBtns} from './HexagonBtns';
import '../css/index.scss';

class App extends React.Component {

    render() {
        let hexArr = [1,1,1,0,1,1,1];
        let initialPages = [
            {id: 0, obj: <HexagonTransformBtns hexList={hexArr} /> },
            {id: 1, obj: <HexagonHollowBtns />},
            {id: 2, obj: <textarea />}
        ];
        return (
            <div>
                <OnePageScroll initialPages={initialPages} />
            </div>
                );
    }


};

render(<App />, document.getElementById('container'));
