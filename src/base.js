import Rebase from 're-base';
import firebase from 'firebase';


const app = firebase.initializeApp({
    apiKey: "AIzaSyDxkkdr7HGUMJ2M80KsEyim-d0tUOukmeY",
    authDomain: "canvas-b27a3.firebaseapp.com",
    databaseURL: "https://canvas-b27a3.firebaseio.com",
    projectId: "canvas-b27a3",
    storageBucket: "canvas-b27a3.appspot.com",
    messagingSenderId: "157453507121"
});
export const rebase = Rebase.createClass(app.database());

// //add the authProvides your app needs: google, facebook, twitter, github,
export const googleProvider = new firebase.auth.GoogleAuthProvider();
