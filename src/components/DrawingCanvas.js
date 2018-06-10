import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";


class DrawingCanvas extends Component {

    state = {
        color: "#ffc600",
        width: 400,
        height: 400
    };
   
    static defaultProps = {
        loadTimeOffset: 5,
        brushSize: 6,
        brushColor: "#444",
        canvasWidth: 400,
        canvasHeight: 400,
        disabled: false
    };

    

render() {
        return (
            
                <div >
                    <button
                        onClick={() => {
                            localStorage.setItem(
                                "savedDrawing",
                                this.saveableCanvas.getSaveData()
                            );
                        }}
                    >Save</button>
                    <button
                        onClick={() => {
                            this.saveableCanvas.clear();
                        }}
                    >Clear</button>
                    <button
                        onClick={() => {
                            this.saveableCanvas.undo();
                        }}
                    >Undo</button>
                <CanvasDraw
                    ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                    brushColor={this.state.color}
                    canvasWidth={this.state.width}
                    canvasHeight={this.state.height}
                    />
            </div>
        );
    }
}

    export default DrawingCanvas;

    