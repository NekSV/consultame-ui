import * as firebaseAdmin from "firebase-admin"
//import serviceAccount from "config/firebase-service-account.json"
import FIREBASE from "config/firebase.config"

// Check whether firebase admin has been initialized
if (!firebaseAdmin.apps.length) {
  // Initialize firebase admin
  firebaseAdmin.initializeApp(FIREBASE)
}

export { firebaseAdmin }
