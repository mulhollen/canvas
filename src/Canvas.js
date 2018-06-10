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
            done: false,
            artwork: null,
            name: null,
            artist: null,
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
                    rebase.fetch(`artwork/picasso/`, {
                        context: this,
                    }).then(data => {
                        console.log("artwork data", data.full);
                        this.setState({
                            artwork: data.full,
                            name: data.name,
                            artist: data.artist,
                        })
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
            if(this.state.artwork === null) {
                return(
                    <div>
                        <h1>loading...</h1>
                    </div>
                )
            } else {
                return (
                    <div>
                        <img src={this.state.artwork} alt="game art" />
                        <h1>{this.state.name}</h1>
                        <h2>{this.state.artist}</h2>
                    </div>
                )
            }
            
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

