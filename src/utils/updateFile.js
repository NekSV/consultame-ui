import { firebaseClient } from '@components/firebase/firebaseClient';
import 'firebase/storage'


const updateFile = (file) => {
  return new Promise((resolve, reject) => {
    const storage = firebaseClient.storage();
    storage
      .ref(`/bg/${file.name}`)
      .put(file)
      .then(() => resolve({status: 'success', error: null}))
      .catch((err) => resolve({status: 'fail', error: err}))
  });
};

export default updateFile;