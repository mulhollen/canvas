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
            waitingRoom: true,
            artPiece: null,
            done: false,
        };
        this.drawingDone = this.drawingDone.bind(this);
        this.signIn = this.signIn.bind(this);
    }
    
    componentWillMount(){
        
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

    signIn = () => {
        // check and see if there's a game
        checkGame(1);
        this.setState({
            waitingRoom: false
        })
    }
 
    drawingDone(playerID) {
        console.log("you made it here");
        
    }



    render() {

       if(this.state.waitingRoom){
           return(
               <div>
                   <h1>you made it here</h1>
                   <button onClick={() => this.signIn(1)}>Wanna Play?</button>
               </div>
           );
       }else if (!this.state.game && !this.state.done && !this.state.waitingRoom) {
            return (
                <div>
                    <button onClick={() => startGame(1)}>Start</button>
                </div>
            );
        }else if(this.state.game) {
            return (
                <div>
                    <h1>game time</h1>
                    <img src={this.state.artPiece} alt="player art piece" />
                    <DrawingCanvas drawingDone={this.drawingDone} />
                 </div>
            );
        } else if(this.state.done){
            <div>
                <h1>killer work!</h1>
            </div>
        }
       
    }
    }

export default Game;
