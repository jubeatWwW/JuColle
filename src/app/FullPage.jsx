import React from 'react';
import ReactDOM from 'react-dom';
import {HexagonBtns} from './HexagonBtns';

class Pages extends React.Component {
    
    constructor(){
        super();

        let InputType  = [{id: 1,obj: <HexagonBtns />},{id: 2,obj: <HexagonBtns />}];
        this.state = {
            pagesInfo: [],
            isScrolling: false,
            currentPage: 0,
            pageCnt: 2,
            firstLoad: true
        }

        this.state.pagesInfo = InputType;
    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }
    
    addPage(num, obj){
        let newInfo = this.state.pagesInfo;
        const INFO_LENGTH = newInfo.length;
        
        if(num > INFO_LENGTH){
            num = INFO_LENGTH;
        } else if(num < 0){
            num = 0;
        }

        for(let id=num; id <= INFO_LENGTH; id++){
            let tmp = newInfo[id];
            newInfo[id] = {id, obj};
            if(typeof tmp !== 'undefined')
                obj = tmp.obj;
        }       

        this.setState({pagesInfo: newInfo, pageCnt: INFO_LENGTH+1});
    }

    replacePage(num){
    }

    deletePage(num){
        let newInfo = this.state.pagesInfo;
        const INFO_LENGTH = newInfo.length;
        
        if(INFO_LENGTH == 0) return;
        num = num > INFO_LENGTH ? INFO_LENGTH-1 : num;
        num = num < 0 ? 0 : num;

        for(let id=num; id < INFO_LENGTH - 1 ; id++){
            newInfo[id] = {id, obj:newInfo[id+1].obj};
        }
        newInfo.pop();

        this.setState({pagesInfo: newInfo, pageCnt: INFO_LENGTH - 1});
    }

    _scrolling(){
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve();
            }, 3);
        });
    }

    pageScroll(scrollY, dist, direction, speed){
        this.setState({isScrolling: true});
        return this._scrolling().then(()=>{
            if(direction==1 && scrollY < dist){
                if(scrollY + speed >= dist)
                    window.scrollTo(0, dist);
                else
                    window.scrollTo(0, window.scrollY + speed);
                this.pageScroll(window.scrollY, dist, direction, speed);
            } else if(direction == -1 && scrollY > dist){
                if(scrollY - 5 <= dist)
                    window.scrollTo(0, dist);
                else    
                    window.scrollTo(0, window.scrollY - speed);
                this.pageScroll(window.scrollY, dist, direction, speed);
            } else{
                this.setState({isScrolling: false});
            }
        })
    }

    onWheel(event){
        event.preventDefault();
        if(this.state.firstLoad){
            let currentPage = Math.floor((scrollY + 8) / this.refs.page0.clientHeight);
            this.setState({firstLoad: false});
        }
        if(!this.state.isScrolling){
            this.setState({isScrolling: true});
            
            let currentPage = this.state.currentPage;
            
            if(event.deltaY >= 0){
                if(currentPage == this.state.pageCnt-1) {
                    this.setState({isScrolling: false});
                    return; 
                } 
                
                this.pageScroll(window.scrollY, this.refs[`page${currentPage+1}`].offsetTop - 8, 1, 7);
                this.setState({currentPage: currentPage + 1});

            } else{
                if(currentPage == 0) {
                    this.setState({isScrolling: false});
                    return; 
                } 

                this.pageScroll(window.scrollY, this.refs[`page${currentPage-1}`].offsetTop - 8, -1, 7);
                this.setState({currentPage: currentPage - 1});
                
            }
        }
    }

    render(){
        return (
            <div onWheel={this.onWheel.bind(this)}>
                {
                    this.state.pagesInfo.map((item) => {
                        return <section ref={`page${item.id}`} className={`page-${item.id}`} key={item.id}>{item.obj}</section>;
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

        this.state = {
            isScrolling: false
        }
    }

    render(){
        return <Pages ref={this.refVar}/>;
    }

    componentDidMount(){
        this.refs[this.refVar].addPage(0, <div></div>);
        this.refs[this.refVar].addPage(1, <textarea />);
        this.refs[this.refVar].deletePage(1);
        
    }
}

export {PageTest, Pages};
