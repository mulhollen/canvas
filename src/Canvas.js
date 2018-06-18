import React, { Component } from 'react';
import qr from './gameQRphone.png';
import './App.css';
import { rebase } from './base';
import CanvasDraw from "react-canvas-draw";
import { endCanvas } from './DBInteraction';
import Carousel from './components/Carousel';


class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carousel: true,
            game: false,
            done: false,
            artwork: null,
            name: null,
            artist: null,
            userArt1: null,
            userArt2: null,
            userArt3: null,
            userArt4: null
        };
        
    }

    componentDidMount() {

        // listening for game start & art return for canvas
        rebase.listenTo('games', {
            context: this,
            asArray: true,
            then(data) {
                console.log("listener data", data)
                if (data[0] === undefined) {
                    console.log('Canvas: no game data');
                } else if (data[0].start === true) {
                    // listening to start game
                    this.setState({
                        carousel: false,
                        game: true,
                    })

                    rebase.fetch(`artCounter`, {
                        context: this,
                    }).then(data => {
                        if (data === undefined) {
                            console.log("Canvas art return error");
                        } else {
                            rebase.fetch(`artwork/${data.number}/`, {
                                context: this,

                            }).then(data => {
                                console.log("artwork data", data.full);
                                this.setState({
                                    artwork: data.full,
                                    name: data.name,
                                    artist: data.artist,
                                })
                            })
                        }
                    })
                }
            }
        })
        
        // listening for players
        rebase.listenTo('games', {
            context: this,
            asArray: true,
            then(data) {
                if (data[0]=== undefined){
                    console.log("Canvas: no player data")
                } else if (data[0]) {
                    // listening for all players to be done
                    if (data[0].player1 === false && data[0].player2 === false && data[0].player3 === false && data[0].player4 === false && data[0].start === true) {
                        this.setState({
                            game: false,
                            done: true
                        })
                    }
                    // cancel game catch
                    if (data[0] === undefined) {
                        this.setState({
                            carousel: true,
                            game: false,
                            done: false,
                        })
                    }
                }
            }
        })

        // listening for gallery canvas pieces 
        rebase.listenTo('gallery', {
            context: this,
            asArray: true,
            then(data) {
                if(data[0] === undefined){
                    console.log("nothing is in gallery")

                } else if(data[0]) {
                    this.setState({
                        userArt1: data[0].piece1,
                        userArt2: data[0].piece2,
                        userArt3: data[0].piece3,
                        userArt4: data[0].piece4,
                    })
                }
            }
        })

        

    }

    componentDidUpdate(){
        if(this.state.done && !this.state.game){
        this.loadArtwork();
        }       
    }

    
    loadArtwork = () => {
    
        if (this.state.userArt1){
            this.loadableCanvas1.loadSaveData(
                this.state.userArt1
            );
        }

        if (this.state.userArt2){
            this.loadableCanvas2.loadSaveData(
                this.state.userArt2
            );
        }

        
        if(this.state.userArt3){
            this.loadableCanvas3.loadSaveData(
                this.state.userArt3
            );
        }

        if(this.state.userArt4){
            this.loadableCanvas4.loadSaveData(
                this.state.userArt4
            );
        }

         console.log("reset game", this);
        this.resetGame();
    }

    resetGame = () => {
        setTimeout(function () {
            this.setState({ 
                carousel: true,
                game: false,
                done: false,
            });
            endCanvas();
            
        }.bind(this), 30000);  // wait 30 seconds, then reset to false
    }

    render() {

        if (this.state.carousel) {
            return (
                <div>
                    <div className="d-flex justify-content-center my-5 mh-100">
                        <Carousel />
                    </div>
                    <div className="qr-position">
                        <img src={qr} alt="qr code" />
                        <h1>SCAN TO START</h1>
                    </div>
                </div>
            );
        }
        else if (this.state.game) {
            if(this.state.artwork === null) {
                return(
                    <div>
                        <h1>loading...</h1>
                    </div>
                )
            } else {
                return (
                    <div className="d-flex justify-content-center my-5 mh-100">
                        <img className="mr-5" src={this.state.artwork} alt="game art" />
                        <div className="align-self-center">
                            <h1>{this.state.name.toUpperCase()}</h1>
                            <h2>{this.state.artist}</h2>
                        </div>
                    </div>
                )
            }
            
        } else if(this.state.done) {
            return (
                <div className="d-flex justify-content-center">
                    <div id="artFrame mx-5">
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
                    <div className="align-self-center mx-5">
                        <h1>{this.state.name.toUpperCase()}</h1>
                        <h2>{this.state.artist} &amp; Others</h2>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="d-flex justify-content-center flex-column my-5 mh-100">
                    <h1 className="text-center">Sorry</h1>
                    <h3>Looks like there's been an error</h3>
                </div>
            )
        }
    }
}
export default Canvas;

