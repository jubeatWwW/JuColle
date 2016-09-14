import React from 'react';

export default class SideBar extends React.Component{
    render(){
        return (
            <aside>
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 500 500"
                    version="1.1"
                    className="side-svg">
                    <path d="M10 250 A 1 1 0 0 1 490 250 A 1 1 0 0 1 10 250" 
                            stroke="white" fill="transparent" strokeWidth="1.5" className="sidebar-circle" />

                    <symbol id="big-dot"><circle cx="490" cy="250" r="5" fill="white" /></symbol>
                    <symbol id="med-dot"><circle cx="490" cy="250" r="3" fill="white" /></symbol>
                    <symbol id="small-dot"><circle cx="490" cy="250" r="1.5" fill="white" /></symbol>

                    <symbol id="big-dots">
                        <use xlinkHref="#big-dot" x="0" y="0" />
                        <use xlinkHref="#big-dot" x="0" y="0" transform="rotate(-60, 250, 250)"/>
                        <use xlinkHref="#big-dot" x="0" y="0" transform="rotate(60, 250, 250)"/>
                    </symbol>
                    <symbol id="med-dots">
                        <use xlinkHref="#med-dot" x="0" y="0" transform="rotate(40, 250, 250)"/>
                        <use xlinkHref="#med-dot" x="0" y="0" transform="rotate(20, 250, 250)"/>
                        <use xlinkHref="#med-dot" x="0" y="0" transform="rotate(-20, 250, 250)"/>
                        <use xlinkHref="#med-dot" x="0" y="0" transform="rotate(-40, 250, 250)"/>
                    </symbol>
                    
                    <symbol id="small-dots">
                        <use xlinkHref="#small-dot" x="0" y="0" transform="rotate(50, 250, 250)"/>
                        <use xlinkHref="#small-dot" x="0" y="0" transform="rotate(30, 250, 250)"/>
                        <use xlinkHref="#small-dot" x="0" y="0" transform="rotate(10, 250, 250)"/>
                        <use xlinkHref="#small-dot" x="0" y="0" transform="rotate(-10, 250, 250)"/>
                        <use xlinkHref="#small-dot" x="0" y="0" transform="rotate(-30, 250, 250)"/>
                        <use xlinkHref="#small-dot" x="0" y="0" transform="rotate(-50, 250, 250)"/>
                    </symbol>

                    <use xlinkHref="#big-dots" x="0" y="0"/>
                    <use xlinkHref="#med-dots" x="0" y="0"/>
                    <use xlinkHref="#small-dots" x="0" y="0"/>
                </svg>
            </aside>
        );
    }
}
