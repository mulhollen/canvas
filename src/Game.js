import React, { Component } from 'react';
import './App.css';
import { checkGame, startGame } from './DBInteraction';
import { rebase } from './base';
import DrawingCanvas from './components/DrawingCanvas';


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
        // this.hideLocalImage = this.hideLocalImage.bind(this);
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
        if (this.state.localImage === "show") {
            this.setState({ localImage: "hide" })
        } else {
            this.setState({ localImage: "show" })
        }
    }


    drawingDone(playerID) {
        this.setState({
            done: true,
        })
        console.log("you made it here", this.state.done);
    }

    render() {

       if(this.state.startingPad){
           return(
               <div>
                   <h1>you made it here</h1>
                   <button onClick={() => this.signIn(1)}>Wanna Play?</button>
               </div>
           );
        }else if (!this.state.game && !this.state.done && !this.state.waitingRoom && !this.state.startingPad) {
            return (
                <div>
                    <button onClick={() => startGame(1)}>Start</button>
                </div>
            );
        }else if(this.state.waitingRoom) {
            return (
                <div>
                    <h1>wait for the next game!</h1>
                </div>
            );
       } else if (this.state.done) {
           return(
            <div>
                <h1>killer work!</h1>
            </div>
           );
       }else if(this.state.game) {
            return (
                <div>
                    <img src={this.state.artPiece} className={this.state.localImage} alt="player art piece" />
                    <button onClick={() => this.hideLocalImage()}>Hide Image</button>
                    <DrawingCanvas drawingDone={this.drawingDone} />
                 </div>
            );
        }
       
    }
    }

export default Game;
