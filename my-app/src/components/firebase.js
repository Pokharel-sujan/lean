import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAybgwgJ0jg8k86i58cmSFQPR6x3cIa0yw",
    authDomain: "lean5s.firebaseapp.com",
    databaseURL: "https://lean5s.firebaseio.com",
    projectId: "lean5s",
    storageBucket: "lean5s.appspot.com",
    messagingSenderId: "836810307583"
  };
  firebase.initializeApp(config);

  export default firebase;