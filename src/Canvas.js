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
            userArt1: null,
            userArt2: null,
            userArt3: null,
            userArt4: null
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
        
        // rebase.listenTo('games', {
        //     context: this,
        //     asArray: true,
        //     then(data) {
        //         if (data[0]=== undefined){
        //             console.log("no player data")
        //         } else if (data[0] === true) {
        //             console.log("PLAYER DATA", data)
        //         }
        //     }
        // })

        rebase.listenTo('gallery', {
            context: this,
            asArray: true,
            then(data) {
                console.log("gallery data", data[0].piece3)
                    this.setState({
                        userArt1: data[0].piece1,
                        userArt2: data[0].piece2,
                        userArt3: data[0].piece3,
                        userArt4: data[0].piece4,
                    })
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
                    <img src={this.state.userArt1} alt="userartwork" />
                    <img src={this.state.userArt2} alt="userartwork" />
                    <img src={this.state.userArt3} alt="userartwork" />
                    <img src={this.state.userArt4} alt="userartwork" />                                        
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

