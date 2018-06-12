import React, { Component } from 'react';
import qr from './gameQRphone.png';
import './App.css';
import { rebase } from './base';
import CanvasDraw from "react-canvas-draw";

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

        // listening for game start
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
        
        // listening for players
        rebase.listenTo('games', {
            context: this,
            asArray: true,
            then(data) {
                if (data[0]=== undefined){
                    console.log("no player data")
                } else if (data[0]) {
                    console.log("PLAYER DATA", data)
                    if (data[0].player1 === true) {
                        this.setState({
                            player1: true
                        })
                    } 
                    if(data[0].player2 === true) {
                        this.setState({
                            player2: true
                        })
                    } 
                    if (data[0].player3 === true){
                        this.setState({
                            player3: true
                        })
                    } 
                    if (data[0].player4 === true){
                        this.setState({
                            player4: true
                        }) 
                    }
                }
            }
        })

        // listening for gallery canvas pieces 
        rebase.listenTo('gallery', {
            context: this,
            asArray: true,
            then(data) {
                    this.setState({
                        userArt1: data[0].piece1,
                        userArt2: data[0].piece2,
                        userArt3: data[0].piece3,
                        userArt4: data[0].piece4,
                    })
            }
        })

        

    }

    componentDidUpdate(){
        if(this.state.done && !this.state.game){
        this.handleLoad();
        }       
    }

    handleLoad = () => {
    
                this.loadableCanvas1.loadSaveData(
                    this.state.userArt1
                );
                this.loadableCanvas2.loadSaveData(
                    this.state.userArt2
                );
                this.loadableCanvas3.loadSaveData(
                    this.state.userArt3
                );
                this.loadableCanvas4.loadSaveData(
                    this.state.userArt4
                );
            
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
                // this.displayCanvas(this.state.userArt1)
            console.log("Canvas draw", this.state);
                    return (
                        <div id="artFrame">
                            <div>
                            <CanvasDraw
                            id="1"
                                disabled
                                ref={canvasDraw => (this.loadableCanvas1 = canvasDraw)}
                            />
                            </div>
                            <div>
                            <CanvasDraw
                            id="2"
                                disabled
                                ref={canvasDraw => (this.loadableCanvas2 = canvasDraw)}
                            />
                            </div>
                            <div>
                            <CanvasDraw
                            id="3"
                                disabled
                                ref={canvasDraw => (this.loadableCanvas3 = canvasDraw)}
                            />
                            </div>
                            <div>
                            <CanvasDraw
                            id="4"
                                disabled
                                ref={canvasDraw => (this.loadableCanvas4 = canvasDraw)}
                            />
                            </div>
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

