import React from 'react';


export default class HexagonBtn extends React.Component{
    componentDidMount(){
        const canvas = this.refs.hexagon;
        let outerSize = canvas.width/4
        this.drawHexagon({centerX: outerSize, centerY: outerSize}, outerSize);
    }

    drawHexagon({centerX = 20, centerY = 20}, size = 25, isOuter = true){
        const ctx = this.refs.hexagon.getContext('2d');

        if(!isOuter){
            ctx.globalCompositeOperation = "destination-out";
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
        }else{
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        }
        
        ctx.beginPath();
        ctx.moveTo(centerX+size*Math.cos(0), centerY+size*Math.sin(0));
        for( let i=1; i<=6; i++ ){
            ctx.lineTo(centerX + size * Math.cos(i*2*Math.PI/6), 
                    centerY + size * Math.sin(i*2*Math.PI/6));
        }
        
        ctx.fill();

        if(isOuter)
            this.drawHexagon({centerX, centerY}, size-10, false);
        else
            ctx.globalCompositeOperation = "source-over";

    }

    render(){
        return (
            <div>
                <canvas ref="hexagon" />
            </div>
        );
    }
}
