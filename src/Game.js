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
            artPiece: null,
            done: false,
        };
        this.drawingDone = this.drawingDone.bind(this);
    }
    
    componentWillMount(){
        // check and see if there's a game
        checkGame(1);
    }

    componentDidMount(){
        rebase.listenTo('games', {
            context: this,
            asArray: true,
            then(data) {
                console.log("listener data", data)
                if(data[0] === undefined){
                    console.log('no data');
                }else if(data[0].start === true) {
                   if (localStorage.hasOwnProperty("artURL")){
                    let url = localStorage.getItem("artURL")
                    url = JSON.parse(url);
                    this.setState({
                        artPiece: url
                    });
                    }
                    this.setState({
                        game: true,
                    })
                }
            }
        })

    }
 
    drawingDone(playerID) {
        console.log("you made it here", this);
        this.setState({
            done: true,
            game: false
        })
    }



    render() {

        if (!this.state.game && !this.state.done) {
            return (
                <div>
                    <button onClick={() => startGame(1)}>Start</button>
                </div>
            );
        }else if(this.state.game && !this.state.done) {
            return (
                <div>
                    <img src={this.state.artPiece} alt="player art piece" />
                    <DrawingCanvas drawingDone={this.drawingDone} />
                 </div>
            );
        } else if(this.state.done){
            return(
                <div>
                    <h1>killer work!</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>error</h1>
                </div>
            );
        }
       
    }
    }

export default Game;
