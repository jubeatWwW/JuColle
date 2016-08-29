import React from 'react';


class HexagonHollowBtn extends React.Component{
    componentDidMount(){
        const canvas = this.refs.hexagon;
        let sizeX = canvas.width/2,
            sizeY = canvas.height/2;
        let centerX = canvas.width/2,
            centerY = canvas.height/2;
        this.drawHexagon({centerX, centerY}, {sizeX, sizeY});
    }

    drawHexagon({centerX = 20, centerY = 20} = {}, {sizeX = 25, sizeY = 25} = {}, isOuter = true){
        const ctx = this.refs.hexagon.getContext('2d');

        if(!isOuter){
            ctx.globalCompositeOperation = "destination-out";
            ctx.fillStyle = "rgba(255, 255, 255, 1)";
        }else{
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        }
        
        ctx.beginPath();
        ctx.moveTo(centerX+sizeX*Math.cos(0), centerY+sizeY*Math.sin(0));
        for( let i=1; i<=6; i++ ){
            ctx.lineTo(centerX + sizeX * Math.cos(i*2*Math.PI/6), 
                    centerY + sizeY * Math.sin(i*2*Math.PI/6));
        }
        
        ctx.fill();

        if(isOuter)
            this.drawHexagon({centerX, centerY}, {sizeX: sizeX*0.9, sizeY: sizeY*0.9}, false);
        else
            ctx.globalCompositeOperation = "source-over";

    }

    render(){
        return (
            <div className={this.props.hexNum} style={this.props.style}>
                <canvas ref="hexagon" />
            </div>
        );
    }
}

class HexagonHollowBtns extends React.Component {
 
    constructor(){
        super();
        this.state = {
            surroundedHex: []
        }
        for(let id=1; id<=6; id++ ){
            this.state.surroundedHex.push({id: id, style:{}});
        }
    }
    
    render(){
        return(
            <div>
                <div ref="centerHex" className="hex-center hex-btn"><HexagonHollowBtn /></div>
                <div>
                {
                    this.state.surroundedHex.map((hex) =>{
                        return <HexagonHollowBtn hexNum={`hex-${hex.id} hex-btn`} style={hex.style} key={hex.id}/>
                    })
                }
                </div>
            </div>
            )
    };

}

class HexagonSolidBtn extends React.Component {
    render(){
        return <div className="pure-hex"></div>
    }
}

class HexagonTransformBtn extends React.Component {
    render(){
        return (
            <li className="transform-hex">
                <div className="transform-hex-inner">
                    <div className="transform-hex-content"></div>
                </div>
            </li>
        );
    }
}

class HexagonTransformBtns extends React.Component {
    render(){
        let hexList = this.props.hexList;
        return (
            <ui className="hex-grid">
                {
                    hexList.map( (hex) => {
                        return hex==0 ? <li className="hole transform-hex"></li> : <HexagonTransformBtn  />;
                    })
                }    
            </ui>
        );
    }
}


export { HexagonHollowBtn, HexagonHollowBtns, HexagonSolidBtn, HexagonTransformBtn, HexagonTransformBtns };
