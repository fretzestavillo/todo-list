import { useEffect, useRef, useState } from 'react';
import '../component/style.css';
import { doc, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';

export function EditableText() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [fbdata, setfbdata] = useState<string[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
  }, [db]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedData = event.target.value.split('\n');
    setfbdata(updatedData);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      saveDataToFirestore(updatedData);
    }, 3000);
  };

  const saveDataToFirestore = async (data: string[]) => {
    try {
      const docRef = doc(db, 'todoList', 'todo1');
      await updateDoc(docRef, {
        list: data,
      });
      console.log('Data saved to Firestore');
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
    }
  };

  return (
    <div>
      <textarea
        onChange={handleChange}
        value={fbdata.join('\n')}
        className="inputStyle"
      />
    </div>
  );
}
