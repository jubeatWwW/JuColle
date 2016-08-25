import React from 'react';
import HexagonBtn from './HexagonBtn';

export default class MainMenuHex extends React.Component {
 
    constructor(){
        super();
        this.state = {
            surroundedHex: []
        }
        for(let id=1; id<=6; id++ ){
            this.state.surroundedHex.push({id: id, style:{}});
        }
    }

    componentDidMount(){

    }
    
    render(){
        return(
            <div>
                <div ref="centerHex" className="hex-center hex-btn"><HexagonBtn/></div>
                <div>
                {
                    this.state.surroundedHex.map((hex) =>{
                        return <HexagonBtn hexNum={`hex-${hex.id} hex-btn`} style={hex.style} key={hex.id}/>
                    })
                }
                </div>
            </div>
            )
    };

}
