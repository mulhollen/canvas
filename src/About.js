import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Game from './Game';
import Canvas from './Canvas';
import './App.css';

class Routes extends Component {

    render() {
        return (
                <div className="d-flex flex-column justify-content-center mt-5 pt-5 align-items-center">
                    <Link className="button-blue text-center p-3 m-3 col-md-3" to='/Game'><h2>GO TO GAMEPLAY</h2></Link>
                    <Link className="button-blue text-center p-3 m-3 col-md-3" to='/Canvas'><h2>STARTUP CANVAS</h2></Link>
                </div>
        );
    }
}

export default Routes;


