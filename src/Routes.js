import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Game from './Game';
import Canvas from './Canvas';
import About from './About';

class Routes extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/Canvas' component={About} />
                    <Route path='/Game' component={Game} />
                    <Route path='/Projection' component={Canvas} />
                </div>
            </Router>
        );
    }
}

export default Routes;


