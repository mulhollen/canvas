import React, { Component } from 'react';
import './App.css';
import { checkGame, startGame} from './DBInteraction';
import { rebase } from './base';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: false,
            artPiece: null,
        };
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
 



    render() {

        if (!this.state.game) {
            return (
                <div>
                    <h1>you made it here</h1>
                    <button onClick={() => startGame(1)}>Start</button>
                </div>
            );
        }else if(this.state.game) {
            return (
                <div>
                    <h1>game time</h1>
                    <img src={this.state.artPiece} alt="player art piece" />
                 </div>
            );
        }
       
    }
    }

export default Game;
