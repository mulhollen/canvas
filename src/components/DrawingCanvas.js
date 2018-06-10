import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";
import { ChromePicker } from 'react-color';


class DrawingCanvas extends Component {


constructor(props) {
    super(props);
    this.state = {
        color: "#ffc600",
        width: 400,
        height: 400
    };
}

    handleChangeComplete = (color) => {
        this.setState({ color: color.hex });
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
                <ChromePicker
                    color={this.state.color}
                    onChangeComplete={this.handleChangeComplete}
                />
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

    