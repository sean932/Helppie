import * as firebase from 'firebase';

export const config = {
    apiKey: "AIzaSyBPl6gE8e5Y27SErVP7s-jlwKbY3WFRXeg",
    authDomain: "helppie-5e78e.firebaseapp.com",
    databaseURL: "https://helppie-5e78e.firebaseio.com/",
    storageBucket: "gs://helppie-5e78e.appspot.com/"
};

export const firebaseApp = firebase.initializeApp(config);

export const firebaseDbh = firebase.database();
export const authRef = firebase.auth();

module.exports = firebaseDbh;