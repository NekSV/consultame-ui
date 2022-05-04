import { firestoreClient } from '@components/firebase/firestoreClient';
import 'firebase/firestore'


const editDoc = (collection, document) => {
  return new Promise((resolve, reject) => {
    firestoreClient
      .collection(collection)
      .doc(document.id)
      .update(document)
      .then(() => resolve({status: 'success', error: null}))
      .catch((err) => resolve({status: 'fail', error: err}))
  });
};

export default editDoc;