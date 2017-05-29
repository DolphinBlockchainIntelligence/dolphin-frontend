import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyDNBTPmuHbp7-VV93jMb_1OlwC0VxkTvJA",
  authDomain: "dolphinbi-187ba.firebaseapp.com",
  databaseURL: "https://dolphinbi-187ba.firebaseio.com",
  projectId: "dolphinbi-187ba",
  storageBucket: "dolphinbi-187ba.appspot.com",
  messagingSenderId: "456387829714"
}
firebase.initializeApp(config)
export default firebase