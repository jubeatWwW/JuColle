import React from 'react';
import ReactDOM from 'react-dom';

export default class OnePageScroll extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            pagesInfo: this.props.initialPages,
            currentPage: 0,
            style: {},
            touchStart: false,
            touchPosY: 0
        }

    }


    addPage(obj, num = 0){
        let newInfo = this.state.pagesInfo;
        const INFO_LENGTH = newInfo.length;

        console.log(newInfo);
        
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


    _scrollingDelay(time = 1){
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve();
            }, time*1000);
        });
    }

    _pageScroll(pageNum){
        if(!this.state.isScrolling){
            this.setState({isScrolling: true});
            let currentPage = this.state.currentPage;
            const PAGE_NUM = this.state.pagesInfo.length;
            pageNum = pageNum > PAGE_NUM - 1 ? PAGE_NUM - 1 : pageNum;
            
            let newStyle = {
                transition: `all ${this.props.duration_time}s ${this.props.timing_func}`,
                transform: `translate(0, -${pageNum * 100}%)`
            }

            this.setState({
                style: newStyle,
                currentPage: pageNum});

            this._scrollingDelay(this.props.duration_time).then(()=>{
                this.setState({isScrolling: false, touchStart: false});
            });
        }
    }

    pageScrollTo(pageNum){
        this._pageScroll(pageNum);
    }

    onWheel(event){
        event.preventDefault();
        let currentPage = this.state.currentPage;
        const PAGE_NUM = this.state.pagesInfo.length;
        let nextPage = event.deltaY > 0 ? currentPage + 1: currentPage - 1;
        let limit = event.deltaY > 0 ? PAGE_NUM - 1 : 0;
        
        if(currentPage == limit) return;

        this._pageScroll(nextPage);
    }

    onTouchMove(event){
        event.preventDefault();

        let pageY = event.touches[0].pageY;
        if(!this.state.touchStart){
            this.setState({touchPosY: pageY, touchStart: true});
        }else {
            let currentPage = this.state.currentPage;
            const PAGE_NUM = this.state.pagesInfo.length;
                
            let nextPage = this.state.touchPosY > pageY ? currentPage + 1 : currentPage - 1;
            let limit = this.state.touchPosY > pageY ? PAGE_NUM - 1 : 0;

            if(currentPage == limit) return;

            this._pageScroll(nextPage);
        }
    }

    render(){
        return (
            <div onWheel={this.onWheel.bind(this)} onTouchMove={this.onTouchMove.bind(this)} className="one-scroll">
                {
                    this.state.pagesInfo.map((item) => {
                        return (
                            <section ref={`page${item.id}`} className={`page-${item.id} page`} style={this.state.style} key={item.id}>
                                {item.obj}
                            </section>
                        );
                    })
                }
            </div>
        );
    }
}

OnePageScroll.propTypes = {
    timing_func: React.PropTypes.string,
    duration_time: React.PropTypes.number,
}

OnePageScroll.defaultProps = {
    timing_func: 'ease-in-out',
    duration_time: 1,
    initialPages: [{id: 0, obj: <h1>Page1</h1>}, {id: 1, obj: <h1>Page2</h1>}]
}

