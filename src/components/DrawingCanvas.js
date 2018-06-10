import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";


class DrawingCanvas extends Component {


constructor(props) {
    super(props);
    this.state = {
        color: "#ffc600",
        width: 400,
        height: 400
    };
}
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

    