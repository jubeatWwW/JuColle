import React from 'react';
import {render} from 'react-dom';

import OnePageScroll from './One-Page-Scroll';
import {HexagonHollowBtns, HexagonHollowBtn, HexagonSolidBtn, HexagonTransformBtn, HexagonTransformBtns} from './HexagonBtns';
import SideBar from './SideBar';
import '../css/index.scss';

class App extends React.Component {

    render() {
        let hexArr = [1,1,1,0,1,1,1];
        let initialPages = [
            {id: 1, obj: <HexagonTransformBtns hexList={hexArr} /> },
            {id: 2, obj: <HexagonHollowBtns />},
            {id: 3, obj: <textarea />},
        ];
        return (
            <div>
                <SideBar />
                <OnePageScroll initialPages={initialPages} />
            </div>
                );
    }


};

render(<App />, document.getElementById('container'));
