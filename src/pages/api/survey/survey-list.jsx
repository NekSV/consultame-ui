import { firebaseAdmin } from "components/firebase/firebaseAdmin"
import { getFirestore } from 'firebase-admin/firestore';

async function authenticatedHandler(req, res) {
  if (req.method === "GET") {

    try {
      const db = getFirestore.
      // Return firebase data
      res.status(200).json(firebaseData)
    } catch (err) {
      res.status(401).send("Invalid authentication")
    }
  }
}

export default authenticatedHandler
