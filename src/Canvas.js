import React, { Component } from 'react';
import qr from './gameQRphone.png';
import './App.css';
import { rebase } from './base';

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carousel: true,
            game: false,
            done: false
        };
    }

    componentDidMount() {
        rebase.listenTo('games', {
            context: this,
            asArray: true,
            then(data) {
                console.log("listener data", data)
                if (data[0] === undefined) {
                    console.log('no data');
                } else if (data[0].start === true) {
                    this.setState({
                        carousel: false,
                        game: true,
                    })
                }
            }
        })
    }

    render() {

        if (this.state.carousel) {
            return (
                <div>
                    <h1>carousel</h1>
                    <img src={qr} alt="qr code" />
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

