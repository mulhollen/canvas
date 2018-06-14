import { rebase } from './base';

export function checkGame(gameID) {
   rebase.fetch( 'games', {
       context: this,
       asArray: true
   }).then(data => {
       if (!data[0]){
           saveGame(gameID);
       } else {
           checkUser(gameID);
       }
   }).catch(error => {
       console.log("data error");
   })    
}

export function saveGame(gameID) {
    // console.log("save user", user);
    return rebase.initializedApp.database().ref().child(`games/${gameID}`)
        .update({
            start: false,
            player1: true,
            player2: false,
            player3: false,
            player4: false
        }).then(
            returnArt(1)
        )
}

export function checkUser(gameID) {
    rebase.fetch('games', {
        context: this,
        asArray: true
    }).then(data => {
        if (!data[0].player2) {
            return rebase.initializedApp.database().ref().child(`games/${gameID}`)
                .update({
                    player2: true, 
                }).then(
                    returnArt(2)
                )
        } else if (!data[0].player3) {
            return rebase.initializedApp.database().ref().child(`games/${gameID}`)
                .update({
                    player3: true,
                }).then(
                    returnArt(3)
                )
        } else if (!data[0].player4) {
            return rebase.initializedApp.database().ref().child(`games/${gameID}`)
                .update({
                    player4: true,
                    start: true
                }).then(
                    returnArt(4)
                )
        } else {
            console.log("game is full");
        }
    }).catch(error => {
        console.log("player error");
    })

}



export function returnArt(playerID){
    localStorage.setItem("playerID", `${playerID}`)

    console.log("player ID in return Art", playerID);

    if (playerID == "1"){
        console.log("did we make it into the first if statement in return art?");
        let randomNum = Math.floor(Math.random() * Math.floor(4));
        return rebase.initializedApp.database().ref().child(`artCounter`)
            .update({
                number: randomNum
            }).then(
                rebase.fetch(`artwork/${randomNum}/${playerID}`, {
                    context: this,
                }).then(data => {
                    localStorage.setItem("artURL", JSON.stringify(data));
                })
            )
    } else {
        rebase.fetch(`artCounter`, {
            context: this,
        }).then(data => {
            console.log("random art generator data", data.number);
            if(data === undefined){
                console.log("art return error");
            } else {
                rebase.fetch(`artwork/${data.number}/${playerID}`, {
                    context: this,
                
                }).then(data => {
                    localStorage.setItem("artURL", JSON.stringify(data));
                })
            }
        })
    }    
}


export function startGame(gameID){
    return rebase.initializedApp.database().ref().child(`games/${gameID}`)
        .update({
            start: true
        })
}

export function addToGallery(artID, playerNumber, playerCanvas){
        
        if (playerNumber === "1"){ 
        return rebase.initializedApp.database().ref().child(`gallery/${artID}`)
            .update({
                piece1: playerCanvas,
            }).then( data =>{
            return rebase.initializedApp.database().ref().child(`games/${1}`)
                .update({
                    player1: false,
                })
            })
        } else if (playerNumber === "2"){
            return rebase.initializedApp.database().ref().child(`gallery/${artID}`)
                .update({
                    piece2: playerCanvas,
                }).then(data => {
                    return rebase.initializedApp.database().ref().child(`games/${1}`)
                        .update({
                            player2: false,
                        })
                })
        } else if (playerNumber === "3"){
            return rebase.initializedApp.database().ref().child(`gallery/${artID}`)
                .update({
                    piece3: playerCanvas,
                }).then(data => {
                    return rebase.initializedApp.database().ref().child(`games/${1}`)
                        .update({
                            player3: false,
                        })
                })
        } else if (playerNumber === "4"){
            return rebase.initializedApp.database().ref().child(`gallery/${artID}`)
                .update({
                    piece4: playerCanvas,
                }).then(data => {
                    return rebase.initializedApp.database().ref().child(`games/${1}`)
                        .update({
                            player4: false,
                        })
                })
        }
    
}


export function endCanvas() {
    rebase.remove('games', function (err) {
        if (!err) {
            console.log("remove game error")
        }
    });
    rebase.remove('gallery', function (err) {
        if (!err) {
            console.log("remove gallery error")
        }
    });
    localStorage.removeItem('artURL');
    localStorage.removeItem('playerID');
}