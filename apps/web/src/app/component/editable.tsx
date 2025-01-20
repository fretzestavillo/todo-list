import { useEffect, useRef, useState } from 'react';
import '../component/style.css';
import { doc, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';

export function EditableText() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [fbdata, setfbdata] = useState<string[]>([]);

  useEffect(() => {
    const docRef = doc(db, 'todoList', 'todo1');

    const unsubscribe = onSnapshot(docRef, (firebasedata) => {
      if (firebasedata.exists()) {
        setfbdata(firebasedata.data().list);
      } else {
        console.log('No such document!');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedData = event.target.value.split('\n'); // Split lines by new line
    setfbdata(updatedData);
  };

  return (
    <>
      <div>
        <textarea
          onChange={handleChange} // Track changes
          value={fbdata.join('\n')}
          className="inputStyle"
        />{' '}
      </div>
    </>
  );
}
