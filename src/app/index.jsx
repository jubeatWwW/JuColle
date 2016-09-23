import React from 'react';
import {render} from 'react-dom';

import OnePageScroll from './One-Page-Scroll';
import {HexagonHollowBtns, HexagonHollowBtn, HexagonSolidBtn, HexagonTransformBtn, HexagonTransformBtns} from './Pages/Component/HexagonBtns';

import Main from './Pages/Main';

import SideBar from './SideBar';
import '../css/index.scss';

class App extends React.Component {
    constructor(){
        super();
        this.state = {currentPage: 0};
    }

    handleClick(index){
        this.setState({currentPage: index});
        this.refs.mainPage.pageScrollTo(index);
    }
    
    handleHexClick(index){
        console.log(`TheFuckingOutsideIndex: ${index}`);
        this.setState({currentPage: index});
        this.refs.mainPage.pageScrollTo(index);
    }

    render() {
        let hexArr = [1,1,1,0,1,1,1];
        let initialPages = [
            {id: 1, obj: <Main onClick={this.handleHexClick.bind(this)} hexList={hexArr} /> },
            {id: 2, obj: <HexagonHollowBtns/>},
            {id: 3, obj: <textarea />},
            {id: 4, obj: <button />},
            {id: 5, obj: <textarea />},
            {id: 6, obj: <input />}
        ];
        return (
            <div>
                <SideBar onClick={this.handleClick.bind(this)} />
                <OnePageScroll initialPages={initialPages} ref="mainPage"/>
            </div>
                );
    }


};

render(<App />, document.getElementById('container'));
