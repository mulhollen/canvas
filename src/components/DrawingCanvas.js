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
        color: "#57c1e8",
        canvaswidth: 300,
        canvasheight: 400
    };
}

    handleChangeComplete = (color) => {
        this.setState({ color: color.hex });
    }
    
    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    }

render() {

    const styles = reactCSS({
        'default': {
            color: {
                width: '36px',
                height: '36px',
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
            <div> 
                <div className="change-btn-orientation">
                    {/* clear, hide local image, & undo buttons */}
                    <div className="drawing-buttons">
                        <button onClick={() => {this.saveableCanvas.clear();}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 448 512"><path d="M192 188v216c0 6.627-5.373 12-12 12h-24c-6.627 0-12-5.373-12-12V188c0-6.627 5.373-12 12-12h24c6.627 0 12 5.373 12 12zm100-12h-24c-6.627 0-12 5.373-12 12v216c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12V188c0-6.627-5.373-12-12-12zm132-96c13.255 0 24 10.745 24 24v12c0 6.627-5.373 12-12 12h-20v336c0 26.51-21.49 48-48 48H80c-26.51 0-48-21.49-48-48V128H12c-6.627 0-12-5.373-12-12v-12c0-13.255 10.745-24 24-24h74.411l34.018-56.696A48 48 0 0 1 173.589 0h100.823a48 48 0 0 1 41.16 23.304L349.589 80H424zm-269.611 0h139.223L276.16 50.913A6 6 0 0 0 271.015 48h-94.028a6 6 0 0 0-5.145 2.913L154.389 80zM368 128H80v330a6 6 0 0 0 6 6h276a6 6 0 0 0 6-6V128z" /></svg>
                        </button>
                        <button onClick={() => this.props.hideLocalImage()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 576 512"><path d="M272.702 359.139c-80.483-9.011-136.212-86.886-116.93-167.042l116.93 167.042zM288 392c-102.556 0-192.092-54.701-240-136 21.755-36.917 52.1-68.342 88.344-91.658l-27.541-39.343C67.001 152.234 31.921 188.741 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.004 376.006 168.14 440 288 440a332.89 332.89 0 0 0 39.648-2.367l-32.021-45.744A284.16 284.16 0 0 1 288 392zm281.354-111.631c-33.232 56.394-83.421 101.742-143.554 129.492l48.116 68.74c3.801 5.429 2.48 12.912-2.949 16.712L450.23 509.83c-5.429 3.801-12.912 2.48-16.712-2.949L102.084 33.399c-3.801-5.429-2.48-12.912 2.949-16.712L125.77 2.17c5.429-3.801 12.912-2.48 16.712 2.949l55.526 79.325C226.612 76.343 256.808 72 288 72c119.86 0 224.996 63.994 281.354 159.631a48.002 48.002 0 0 1 0 48.738zM528 256c-44.157-74.933-123.677-127.27-216.162-135.007C302.042 131.078 296 144.83 296 160c0 30.928 25.072 56 56 56s56-25.072 56-56l-.001-.042c30.632 57.277 16.739 130.26-36.928 171.719l26.695 38.135C452.626 346.551 498.308 306.386 528 256z" /></svg>
                        </button>
                        <button onClick={() => {this.saveableCanvas.undo();}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 512 512"><path d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z" /></svg>
                        </button>
                    {/* color picker */}
                        <div style={styles.swatch} onClick={this.handleClick}>
                            <div style={styles.color} />
                        </div>
                        {this.state.displayColorPicker ? <div style={styles.popover}>
                            <div style={styles.cover} onClick={this.handleClose} />
                            <SketchPicker color={this.state.color} onChange={this.handleChangeComplete} />
                        </div> : null}

                    </div>
                    {/* canvas */}
                    <div className="center-canvas my-3">
                        <CanvasDraw
                            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                            brushColor={this.state.color}
                            canvasWidth={this.state.canvaswidth}
                            canvasHeight={this.state.canvasheight}
                            />
                    </div>
                </div>
                {/* done and cancel game buttons */}
                <div className="center-buttons">
                    <div className="d-flex m-3 justify-content-around">
                        <button className="button-red col-md-4 mx-2" onClick={() => { endCanvas(); }}><h3 className="p-1 m-0 text-red">CANCEL GAME</h3></button>

                        <button className="button-blue col-md-4 mx-2" onClick={() => {
                            // grabs player ID from local storage
                            let playerID = localStorage.getItem("playerID")
                            playerID = JSON.parse(playerID);

                            // adds cavas to gallery associating correct player ID with canvas position
                            addToGallery("playerDrawing", `${playerID}`, this.saveableCanvas.getSaveData());

                            // Takes player to a waiting room while other players finish their drawings
                            this.props.drawingDone(playerID);
                        }}
                        ><h2 className="p-1 m-0">DONE</h2></button>
                    </div>
                </div>
            </div>
        );
    }
}

    export default DrawingCanvas;

    