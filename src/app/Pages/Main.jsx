import React from 'react';
import {HexagonTransformBtns} from './Component/HexagonBtns';

export default class MainPage extends React.Component{
    handleHexClick(index){
        /*console.log(`TheFuckingOutsideIndex: ${index}`);
        this.setState({currentPage: index});
        this.refs.mainPage.pageScrollTo(index);*/
        this.props.onClick(index);
    }
    render(){
        
        let hexArr = [1,1,1,0,1,1,1];
        return <div><HexagonTransformBtns hexList={hexArr} onClick={this.handleHexClick.bind(this)}/></div>
    }
}



