import React from 'react';


class HexagonBtn extends React.Component{
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
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
        }else{
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
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

class HexagonBtns extends React.Component {
 
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

export { HexagonBtns, HexagonBtn };
