import firebase from 'firebase';
var config = {
    apiKey: 'AIzaSyDUvrIDVIiUiDowSqv8kWukOmyDV06_rzQ',
    authDomain: 'note-app-b5074.firebaseapp.com',
    databaseURL: 'https://note-app-b5074.firebaseio.com',
    projectId: 'note-app-b5074',
    storageBucket: '',
    messagingSenderId: '439515718940'
};
var fire = firebase.initializeApp(config);
export default fire;