import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Game from './Game';
import Canvas from './Canvas';

class Routes extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route path='/Game' component={Game} />
                    <Route path='/Canvas' component={Canvas} />
                </div>
            </Router>
        );
    }
}

export default Routes;


