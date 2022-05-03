import { useCallback, useEffect, useState } from "react";
import { firestoreClient } from '../components/firebase/firestoreClient';
import 'firebase/firestore'

const useDataWhere = (collectionName, field, parameter) => {
  const [docs, setDocs] = useState([]);

  const fetchData = useCallback(() => {

    if (parameter == null) {
      setDocs(null);
    };

    firestoreClient.collection(collectionName).where(field, '==', parameter)
      .onSnapshot(snap => {
        const documents = [];
        snap.forEach(doc => {
          documents.push({ id: doc.id, ...doc.data() })
        });
        setDocs(documents);
      });
  });

  useEffect(() => {
    fetchData();
  }, [collectionName, field, parameter]);
  
  return {
    documents: docs,
    trigger: fetchData
  }
};

export default useDataWhere;