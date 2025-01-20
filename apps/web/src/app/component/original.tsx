import { useEffect, useRef, useState } from 'react';
import '../component/style.css';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';
import { Todo } from './tool';

export function EditableText() {
  const [lastKey, setLastKey] = useState<string>('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const pratice = useRef<HTMLTextAreaElement | null>(null);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [data, setData] = useState<Todo>({
    activity: '',
  });

  useEffect(() => {
    // get collection, doc, field
    const docRef = doc(db, 'todoList', 'todo1');

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data() as Todo);
      } else {
        console.log('No such document!');
      }
    });

    if (lastKey) {
      if (timer) {
        clearTimeout(timer);
      }

      const newTimer = setTimeout(() => {
        delayedFunction();
      }, 5000);

      setTimer(newTimer);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      unsubscribe(); // Cleanup Firestore listener
    };
  }, [lastKey]);

  function lastKeyfunction(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    setLastKey(event.key);
  }

  async function delayedFunction() {
    console.log('last key ', { lastKey });
    // update field
    const addingField = doc(db, 'todoList', 'todo1');

    await updateDoc(addingField, {
      //   activity: 'swimming', // Update activity field
      activity: 'dddggd',
    });
  }
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({ ...data, activity: e.target.value });
  };

  return (
    <>
      <div>
        <h1>Title</h1>
        <textarea
          ref={pratice}
          value={data.activity}
          onChange={handleChange}
          className="inputStyle"
          onKeyDown={lastKeyfunction}
        />
      </div>
    </>
  );
}
