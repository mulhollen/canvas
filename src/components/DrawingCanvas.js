import React, { Component } from "react";
import reactCSS from 'reactcss'
import CanvasDraw from "react-canvas-draw";
import { SketchPicker } from 'react-color';
import { addToGallery, endCanvas } from '../DBInteraction';



class DrawingCanvas extends Component {


constructor(props) {
    super(props);
    this.state = {
        displayColorPicker: false,
        color: "#000",
        canvaswidth: 400,
        canvasheight: 400
    };
}

    handleChangeComplete = (color) => {
        this.setState({ color: color.hex });
    };
    
    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };


render() {

    const styles = reactCSS({
        'default': {
            color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `${this.state.color}`,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });

        return (
            
                <div >
                    <button
                        onClick={() => {

                            
                            let playerID = localStorage.getItem("playerID")
                            playerID = JSON.parse(playerID);

                            addToGallery("Picasso", `${playerID}`, this.saveableCanvas.getSaveData());

                            this.props.drawingDone(playerID);

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

                <div>
                <button
                    onClick={() => {
                        endCanvas();

                    }}
                >Cancel game</button>
                    <div style={styles.swatch} onClick={this.handleClick}>
                        <div style={styles.color} />
                    </div>
                    {this.state.displayColorPicker ? <div style={styles.popover}>
                        <div style={styles.cover} onClick={this.handleClose} />
                        <SketchPicker color={this.state.color} onChange={this.handleChangeComplete} />
                    </div> : null}

                </div>
                <CanvasDraw 
                    ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                    brushColor={this.state.color}
                    canvasWidth={this.state.canvaswidth}
                    canvasHeight={this.state.canvasheight}
                    />
                
                
            </div>
        );
    }
}

    export default DrawingCanvas;

    