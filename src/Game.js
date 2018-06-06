import React, { Component } from 'react';
import './App.css';
import {checkGame, checkUser} from './DBInteraction';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: false,
        };
    }
    
    componentWillMount(){
        // check and see if there's a game
        checkGame(1);
    }

    render() {
        return (
            <div>
                <h1>you made it here</h1>
                {/* <button onClick={this.setState({game: true})}>Start</button> */}
            </div>
        );
    }
    }

export default Game;

