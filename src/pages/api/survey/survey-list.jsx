import { firebaseAdmin } from "components/firebase/firebaseAdmin"
import { getFirestore, collection, getDocs } from 'firebase-admin/firestore';

async function authenticatedHandler(req, res) {
  if (req.method === "GET") {

    try {
      const db = getFirestore();
      const snapshot = await getDocs(collection(db, 'surveys'));

      // Return firebase data
      res.status(200).json(snapshot)
    } catch (err) {
      res.status(401).send("Invalid authentication")
    }
  }
}

export default authenticatedHandler
