import { rebase } from './base';

export function saveGame(gameID) {
    // console.log("save user", user);
    return rebase.initializedApp.database().ref().child(`games/${gameID}`)
        .update({
            start: false,
            player1: true,
            player2: false,
            player3: false,
            player4: false
        })
}

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
       console.log("data", data);
   }).catch(error => {
       console.log("data error");
   })    
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
                })
        } else if (!data[0].player3) {
            return rebase.initializedApp.database().ref().child(`games/${gameID}`)
                .update({
                    player3: true,
                })
        } else if (!data[0].player4) {
            return rebase.initializedApp.database().ref().child(`games/${gameID}`)
                .update({
                    player4: true,
                    start: true
                })
        } else {
            console.log("game is full");
        }
        console.log("data", data);
    }).catch(error => {
        console.log("player error");
    })

}

export function addToGallery(artID, playerNumber, playerCanvas){
    if (playerNumber == 1) {
        return rebase.initializedApp.database().ref().child(`gallery/${artID}`)
            .update({
                piece1: playerCanvas,
            })
    } else if (playerNumber == 2) {
        return rebase.initializedApp.database().ref().child(`gallery/${artID}`)
            .update({
                piece2: playerCanvas,
            })
    } else if (playerNumber == 3) {
        return rebase.initializedApp.database().ref().child(`gallery/${artID}`)
            .update({
                piece3: playerCanvas,
            })
    } else if (playerNumber == 4) {
        return rebase.initializedApp.database().ref().child(`gallery/${artID}`)
            .update({
                piece4: playerCanvas,
            })
    }
    
}