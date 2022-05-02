import { useCallback, useEffect, useState } from "react";
import { firestoreClient } from '../components/firebase/firestoreClient';
import 'firebase/firestore'

const useDocument = (collection, doc) => {
  const [document, setDocument] = useState();

  const fetchDoc = useCallback(() => {
    const ref = firestoreClient.collection(collection).doc(doc);
    ref.get().then((res) => {
      if (res.exists) {
        setDocument(res.data());
      } else {
        setDocument(null)
      }
    })
  })

  useEffect(() => {
    fetchDoc();
  }, [collection, doc]);

  return {
    document: document,
    trigger: fetchDoc
  };
};

export default useDocument