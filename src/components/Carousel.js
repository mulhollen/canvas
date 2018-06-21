import React, { Component } from "react";
import '../App.css';
import { rebase } from '../base';
import CanvasDraw from "react-canvas-draw";


class Carousel extends Component {


    constructor(props) {
        super(props);
        this.state = {
            full: "https://firebasestorage.googleapis.com/v0/b/canvas-b27a3.appspot.com/o/GobelFull.png?alt=media&token=5a588643-5714-4459-a63e-8a3916117dff",
            showImg: true,
        };
    }

    componentWillMount(){
         // listening for gallery canvas pieces 
        // this.fetchGallery();
        rebase.fetch('backup', {
            context: this,
            asArray: true,
            then(data) {
                if (data[0] === undefined) {
                    console.log("nothing is in permanent gallery")

                } else if (data[0]) {
                    console.log("carousel data[0]", data[0])
                    this.setState({
                        artPiece: data[0].artPiece,
                        userArt1: data[0].piece1,
                        userArt2: data[0].piece2,
                        userArt3: data[0].piece3,
                        userArt4: data[0].piece4,
                    })
                }
            }
        }).then(
            this.grabNext()
        ) 
    }

    showGallery = () => {
        if (this.state.userArt1) {
            this.loadableCanvas1.loadSaveData(
                this.state.userArt1
            );
        }

        if (this.state.userArt2) {
            this.loadableCanvas2.loadSaveData(
                this.state.userArt2
            );
        }


        if (this.state.userArt3) {
            this.loadableCanvas3.loadSaveData(
                this.state.userArt3
            );
        }

        if (this.state.userArt4) {
            this.loadableCanvas4.loadSaveData(
                this.state.userArt4
            );
        }
        this.grabArt();
    }
    

    grabArt = () => {
        setTimeout(function () {
            this.setState({
                showImg: true
            })
            this.grabNext();
        }.bind(this), 120000);  
    }

    grabNext = () => {
        setTimeout(function () {
            this.setState({
                showImg: false,
            })
            this.showGallery();
        }.bind(this), 120000);  
    }

    render() {

        if(this.state.showImg === false){
            return (
                <div className="d-flex justify-content-center">
                    <div id="artFrame mx-5 fadeInandOut">
                        <div className="artFrame">
                            <CanvasDraw
                                id="1"
                                disabled
                                ref={canvasDraw => (this.loadableCanvas1 = canvasDraw)}
                            />
                            <CanvasDraw
                                id="2"
                                disabled
                                ref={canvasDraw => (this.loadableCanvas2 = canvasDraw)}
                            />
                        </div>
                        <div className="artFrame">
                            <CanvasDraw
                                id="3"
                                disabled
                                ref={canvasDraw => (this.loadableCanvas3 = canvasDraw)}
                            />
                            <CanvasDraw
                                id="4"
                                disabled
                                ref={canvasDraw => (this.loadableCanvas4 = canvasDraw)}
                            />
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div>
                    <img className="mt-3 fadeInandOut" src={this.state.full} alt="full artwork" />
                </div>
            );
        }
    }
}

export default Carousel;

