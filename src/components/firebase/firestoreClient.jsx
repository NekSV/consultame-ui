import "firebase/auth"
import firebase from 'firebase/app';
import FIREBASE from "config/firebase.config"
import 'firebase/firestore'

try {
  firebase.initializeApp(FIREBASE)
}
catch (err) {console.log(err)}
// if (typeof window !== "undefined" && !firebase.apps.length) {

// }

export const firestoreClient = firebase.firestore();