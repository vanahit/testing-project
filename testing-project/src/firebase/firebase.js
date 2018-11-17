import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCCSlzr2h_kn25n1weF_BOexG1H7UaQj9s",
    authDomain: "testing-f6114.firebaseapp.com",
    databaseURL: "https://testing-f6114.firebaseio.com",
    projectId: "testing-f6114",
    storageBucket: "testing-f6114.appspot.com",
    messagingSenderId: "548744653480"
};
firebase.initializeApp(config);

const database = firebase.database();

database.ref().set({
    users: ' ',
    companies: ' ',
    tests: ' ',
    languages: ' ',
});