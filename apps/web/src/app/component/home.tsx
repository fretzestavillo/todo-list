import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import { firebaseConfig } from './config';
import { getAuth, signOut } from 'firebase/auth';

export function Home() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const db = getFirestore(app);
  const location = useLocation();
  const data = location.state;
  const fireBaseData = {
    uid: data.fireBaseData.uid,
    email: data.fireBaseData.email,
    displayName: data.fireBaseData.displayName,
    token: data.fireBaseData.token,
  };
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      console.log('User signed out');
      navigate('/');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  }

  async function createData() {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        first: 'Ada',
        last: 'Lovelace',
        born: 1815,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async function getData() {
    const docRef = doc(db, 'users', 'i7Qmm5H2KF5Q0KMCFZlA');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  }

  return (
    <>
      <h1>Hi This is your home {fireBaseData.displayName}</h1>
      <div>
        <button onClick={createData}>create data</button>
      </div>
      <div>
        <button onClick={getData}>get Data</button>
      </div>

      <div>
        <button onClick={handleLogout}>LogoutfromHome</button>
      </div>
    </>
  );
}
