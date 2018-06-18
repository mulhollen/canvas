import React, { Component } from 'react';
import './App.css';
import { checkGame, startGame } from './DBInteraction';
import { rebase } from './base';
import DrawingCanvas from './components/DrawingCanvas';
// import CanvasDraw from "react-canvas-draw";


class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: false,
            startingPad: true,
            waitingRoom: false,
            artPiece: null,
            done: false,
            localImage: "show",            
        };
        this.drawingDone = this.drawingDone.bind(this);
        this.hideLocalImage = this.hideLocalImage.bind(this);
    }



    componentDidMount(){

        let artURL = localStorage.getItem("artURL")
        artURL = JSON.parse(artURL);

        rebase.listenTo('games', {
            context: this,
            asArray: true,
            then(data) {
                console.log("listener data", data)
                if(data[0] === undefined){
                    console.log('Game: no game data');
                    this.setState({
                        startingPad: true,
                        done: false
                    });
                } else if (data[0].start === false){
                    // listening for player local art data before game start
                    rebase.fetch(`artCounter`, {
                        context: this,
                    }).then(data => {
                        console.log("random art generator data", data.number);
                        if (data === undefined) {
                            this.setState({
                                game: false,
                                done: false,
                                waitingRoom: false,
                                startingPad: false,
                            });
                        }
                    })
                } else if (data[0].start === true) {
                    // listening for player local art data at game start 
                    // & if the player doesn't have an ID they will be asked to wait for the next game
                    if (localStorage.hasOwnProperty("playerID")) {
                        let url = localStorage.getItem("artURL")
                        url = JSON.parse(url);
                        this.setState({
                            artPiece: url,
                            game: true,
                            startingPad: false,

                        });
                    } else {
                        this.setState({
                            startingPad: false,
                            waitingRoom: true

                        });
                    }
                }
            }
        })

    }

    signIn = () => {
        // check and see if there's a game
        checkGame(1);
        // set the entry state to false
        this.setState({
            startingPad: false,
            game: false,
            waitingRoom: false,
            done: false,
        })
    }

    hideLocalImage(){
        console.log("we made it to hideLocalImage", this);

        if (this.state.localImage === "show") {
            this.setState({ localImage: "hide" })
        } else {
            this.setState({ localImage: "show" })
        }
    }


    drawingDone(playerID) {
        this.setState({
            done: true,
            localImage: "show",
        })
        console.log("you made it here", this.state.done);
    }

    render() {

       if(this.state.startingPad){
           return(
               <div className="vh100">
                    <div className="h-100 d-flex justify-content-center align-items-center">
                        <button className="button-blue" onClick={() => this.signIn(1)}><h1 className="p-3 m-0">JOIN GAME</h1></button>
                    </div>
               </div>
           );
        }else if (!this.state.game && !this.state.done && !this.state.waitingRoom && !this.state.startingPad) {
            return (
                <div className="vh100">
                    <div className="h-100 d-flex justify-content-center align-items-center flex-column">
                        <button className="button-blue" onClick={() => startGame(1)}><h1 className="p-3 m-0">START GAME</h1></button>
                        <h3 className="text-center py-3">Or wait for more players</h3>
                    </div>
                </div>
            );
        }else if(this.state.waitingRoom) {
            return (
                <div className="my-5">
                    <h3 className="text-center display-4">This game is full - Sit back and enjoy the show</h3>
                </div>
            );
       } else if (this.state.done) {
           return(
            <div className="my-5 w-75 mx-auto d-flex flex-column justify-content-center mt-5 pt-5">
                <h1 className="text-center display-5 pb-3 blue-border">KILLER WORK!</h1>
                <p className="pt-3">Keep an eye on the canvas and wait for the other players to finish.</p>
            </div>
           );
       }else if(this.state.game) {
            return (
                <div className="landscape">
                    <div className="landscape">
                        <div className="d-flex flex-column localArt my-3 mx-auto">
                            <img src={this.state.artPiece} className={this.state.localImage} alt="player art piece" />
                        </div>
                        <DrawingCanvas hideLocalImage={this.hideLocalImage} drawingDone={this.drawingDone} />
                    </div>
                </div>
            );
        }
       
    }
    }

export default Game;
