import React from 'react';
import ReactDOM from 'react-dom';
import {HexagonBtns} from './HexagonBtns';

class Pages extends React.Component {
    
    constructor(){
        super();

        let InputType  = [{id: 1,obj: <HexagonBtns />},{id: 2,obj: <HexagonBtns />}];
        this.state = {
            pagesInfo: []
        }

        this.state.pagesInfo = InputType;
    }
    
    addPage(num){
        let oldInfo = this.state.pagesInfo;
        let newInfo = oldInfo.push({id: 3,obj: <HexagonBtns />});
        this.setState({pagesIndo: newInfo});
    }

    replacePage(num){
    }

    deletePage(num){
    }


    render(){
        return (
            <div>
                {
                    this.state.pagesInfo.map((item) => {
                            return <section key={item.id}>{item.obj}</section>;
                    })
                }
            </div>
        );
    }
}

class PageTest extends React.Component {
    constructor(){
        super();
        this.refVar = "no1";
    }

    render(){
        return <Pages ref={this.refVar}/>;
    }

    componentDidMount(){
        //this.refs[this.refVar].addPage();
    }
}

export {PageTest};
