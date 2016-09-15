import React from 'react';
import ShortId from 'shortid';


export default class SideBar extends React.Component{
    handleClick(index){
        this.props.onClick(index);
    }

    render(){
        let bigDotAngle = [-60, 0, 60],
           medDotAngle = [-40, -20, 20, 40],
           smallDotAngle = [-50, -30, -10, 10, 30, 50],
           barAngle = [-50, -30, -10, 10, 30, 50],
           barItem = ['Me', 'Technique', 'Gallery', 'test', 'test', 'test'];
        return (
            <aside>
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 600 500"
                    version="1.1"
                    className="side-svg">
                    <path d="M10 250 A 1 1 0 0 1 490 250 A 1 1 0 0 1 10 250" 
                            stroke="white" fill="transparent" strokeWidth="1.5" className="sidebar-circle" />
                    {
                        barAngle.map((angle, i) => {
                            return(
                                <g id="short-bar" onClick={this.handleClick.bind(this, i)} className="short-bar" transform={`rotate(${angle}, 250, 250)`} key={ShortId.generate()}>
                                    <text x="500" y="250" fill="white">{barItem[i]}</text>
                                    <path d="M490 250 A 240 240 0 0 1 486.3538607 291.6755626" 
                                            stroke="yellow" fill="transparent" strokeWidth="3" strokeLinecap="round" className="bar" />
                                    <path d="M490 250 A 240 240 0 0 0 486.3538607 208.3244373" 
                                            stroke="yellow" fill="transparent" strokeWidth="3" strokeLinecap="round" className="bar" />
                                </g>
                            )
                        })
                    }
                    <symbol id="big-dot"><circle cx="490" cy="250" r="5" fill="white" /></symbol>
                    <symbol id="med-dot"><circle cx="490" cy="250" r="3" fill="white" /></symbol>
                    <symbol id="small-dot"><circle cx="490" cy="250" r="1.5" fill="white" /></symbol>

                    <symbol id="big-dots">
                        {bigDotAngle.map((angle) => {
                            return <use xlinkHref="#big-dot" x="0" y="0" transform={`rotate(${angle}, 250, 250)`} key={ShortId.generate()}/>
                        })}
                    </symbol>
                    <symbol id="med-dots">
                        {medDotAngle.map((angle) => {
                            return <use xlinkHref="#med-dot" x="0" y="0" transform={`rotate(${angle}, 250, 250)`} key={ShortId.generate()}/>
                        })}
                    </symbol>
                    
                    <symbol id="small-dots">
                        {smallDotAngle.map((angle) => {
                        return <use xlinkHref="#small-dot" x="0" y="0" transform={`rotate(${angle}, 250, 250)`} key={ShortId.generate()}/>
                        })}
                    </symbol>


                    <use xlinkHref="#big-dots" className="big-dots" x="0" y="0"/>
                    <use xlinkHref="#med-dots" className="med-dots" x="0" y="0"/>
                    <use xlinkHref="#small-dots" className="small-dots" x="0" y="0"/>
                </svg>
            </aside>
        );
    }
}
