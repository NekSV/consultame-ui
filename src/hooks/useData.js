import { useEffect, useState } from "react";
import { firestoreClient } from '../components/firebase/firestoreClient';
import 'firebase/firestore'

const useData = (collectionName) => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const unsub = firestoreClient.collection(collectionName)
      .onSnapshot(snap => {
        const documents = [];
        snap.forEach(doc => {
          documents.push({ id: doc.id, ...doc.data() })
        });
        console.log(documents);
        setDocs(documents);
      });
    return () => unsub();
  }, [collectionName]);
  return { docs }
};

export default useData;