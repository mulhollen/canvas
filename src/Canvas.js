import React, { Component } from 'react';
import './App.css';

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carousel: true,
            game: false,
            done: false
        };
    }

    render() {

        if (this.state.carousel) {
            return (
                <div>
                    <h1>carousel</h1>
                </div>
            );
        }
        else if (this.state.game) {
            // console.log('trying to render nashvilleopendata component');
            return (
                <div>
                    <h1>game</h1>
                </div>
            )
        } else if(this.state.done) {
            return (
                <div>
                    <h1>done</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>error</h1>
                </div>
            )
        }
    }
}
export default Canvas;

