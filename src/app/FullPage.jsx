import React from 'react';
import ReactDOM from 'react-dom';
import {HexagonHollowBtns, HexagonHollowBtn, HexagonSolidBtn, HexagonTransformBtn} from './HexagonBtns';

class Pages extends React.Component {
    
    constructor(){
        super();

        let InputType  = [{id: 1,obj: <HexagonHollowBtns />},{id: 2,obj: <HexagonHollowBtns />}];
        this.state = {
            pagesInfo: [],
            isScrolling: false,
            currentPage: 0,
            pageCnt: 2,
            scrollCounter: 0,
            touchPosY: 0,
            touchStart: false,
            firstLoad: true
        }

        this.state.pagesInfo = InputType;
    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }
    
    addPage(obj, num = 0){
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

    pageScrollUniformMotion(scrollY, dist, direction, speed){
        this.setState({isScrolling: true});
        return this._scrolling().then(()=>{
            if(direction == 1 && scrollY < dist){
                if(scrollY + speed >= dist)
                    window.scrollTo(0, dist);
                else
                    window.scrollTo(0, window.scrollY + speed);
                this.pageScrollUniformMotion(window.scrollY, dist, direction, speed);
            } else if(direction == -1 && scrollY > dist){
                if(scrollY - speed <= dist)
                    window.scrollTo(0, dist);
                else    
                    window.scrollTo(0, window.scrollY - speed);
                this.pageScrollUniformMotion(window.scrollY, dist, direction, speed);
            } else{
                this.setState({isScrolling: false});
                
                window.scrollTo(0, dist);
                let nextPage = this.state.currentPage + direction;
                if(nextPage < this.state.pagesInfo.length || nextPage >= 0 )    
                   this.setState({currentPage: nextPage});
            }
        })
    }

    pageScrollVarSpeedMotion(lastScrollY, start, dist, direction, speed, accel){
        this.setState({isScrolling: true});
        return this._scrolling().then(()=>{
            
            if(speed < 0){

                window.scrollTo(0, dist);
                this.setState({isScrolling: false, touchStart: false, scrollCounter: 0});
                let nextPage = this.state.currentPage + direction;
                if(nextPage < this.state.pagesInfo.length || nextPage >= 0 )    
                   this.setState({currentPage: nextPage});
                return;
            }
            
            lastScrollY = window.scrollY;

            if(direction == 1 && scrollY < dist){

                if(scrollY + speed >= dist)
                    window.scrollTo(0, dist);
                else
                    window.scrollTo(0, window.scrollY + speed);
                
                if(scrollY + speed <= (start + dist - speed) / 2 )
                    this.pageScrollVarSpeedMotion(lastScrollY, start, dist, direction, speed + accel, Math.abs(accel));
                else
                    this.pageScrollVarSpeedMotion(lastScrollY, start, dist, direction, speed + accel, (-1) * Math.abs(accel));
            
            } else if(direction == -1 && scrollY > dist){
                if(scrollY - speed <= dist)
                    window.scrollTo(0, dist);
                else    
                    window.scrollTo(0, window.scrollY - speed);
                
                if(scrollY + speed >= (start + dist - speed) / 2 )
                    this.pageScrollVarSpeedMotion(lastScrollY, start, dist, direction, speed + accel, Math.abs(accel));
                else
                    this.pageScrollVarSpeedMotion(lastScrollY, start, dist, direction, speed + accel, (-1) * Math.abs(accel));
            
            } else {
                window.scrollTo(0, dist);
                this.setState({isScrolling: false});
                this.setState({touchStart: false});
                let nextPage = this.state.currentPage + direction;
                if(nextPage < this.state.pagesInfo.length || nextPage >= 0 )    
                   this.setState({currentPage: nextPage});
            }
        })
    }

    onWheel(event){
        event.preventDefault();
        if(this.state.firstLoad){
            let currentPage = Math.floor((scrollY + 8) / this.refs.page0.clientHeight);
            this.setState({firstLoad: false, currentPage});
        }
        if(!this.state.isScrolling){
            this.setState({isScrolling: true});
            
            let currentPage = this.state.currentPage;
            
            if(event.deltaY >= 0){
                if(currentPage == this.state.pageCnt-1) {
                    this.setState({isScrolling: false});
                    return; 
                } 
                
                //this.pageScrollUniformMotion(window.scrollY, this.refs[`page${currentPage+1}`].offsetTop - 8, 1, 7);
                this.pageScrollVarSpeedMotion(window.scrollY, window.scrollY, 
                        this.refs[`page${currentPage + 1}`].offsetTop, 1, 0, 0.1);

            } else{
                if(currentPage == 0) {
                    this.setState({isScrolling: false});
                    return; 
                } 

                //this.pageScrollUniformMotion(window.scrollY, this.refs[`page${currentPage-1}`].offsetTop - 8, -1, 7);
                this.pageScrollVarSpeedMotion(window.scrollY, window.scrollY, 
                        this.refs[`page${currentPage - 1}`].offsetTop, -1, 0, 0.1);
                
            }
        }
    }

    onTouchMove(event){
        event.preventDefault();
        if(this.state.firstLoad){
            let currentPage = Math.floor((scrollY + 8) / this.refs.page0.clientHeight);
            this.setState({firstLoad: false, currentPage});
        }
        
        let pageY = event.touches[0].pageY;

        if(!this.state.touchStart){
            this.setState({touchPosY: pageY, touchStart: true});
            console.log("start", pageY);
        } else{
            if(!this.state.isScrolling){
                this.setState({isScrolling: true});
                
                let currentPage = this.state.currentPage;
                console.log(this.state.touchPosY, pageY);
                if(this.state.touchPosY > pageY){
                    if(currentPage == this.state.pageCnt-1) {
                        this.setState({isScrolling: false, touchStart: false});
                        return; 
                    } 
                    this.pageScrollVarSpeedMotion(window.scrollY, window.scrollY, 
                            this.refs[`page${currentPage + 1}`].offsetTop, 1, 0, 0.1);

                } else if(this.state.touchPosY < pageY){
                    if(currentPage == 0) {
                        this.setState({isScrolling: false, touchStart: false});
                        return; 
                    } 
                    this.pageScrollVarSpeedMotion(window.scrollY, window.scrollY, 
                            this.refs[`page${currentPage - 1}`].offsetTop, -1, 0, 0.1);
                } else{
                    this.setState({isScrolling: false, touchStart: false});
                }
            }
        }
    }

    render(){
        return (
            <div onWheel={this.onWheel.bind(this)} onTouchMove={this.onTouchMove.bind(this)}>
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
        this.refs[this.refVar].addPage(<textarea />, 0);
        this.refs[this.refVar].addPage(<HexagonHollowBtns />);
        this.refs[this.refVar].addPage(<HexagonSolidBtn />);
        this.refs[this.refVar].addPage(<HexagonTransformBtn />);
        
    }
}

export {PageTest, Pages};
