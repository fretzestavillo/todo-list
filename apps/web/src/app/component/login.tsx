import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { firebaseConfig } from './config';

export function Login() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      //   const result = await signInWithPopup(auth, provider);
      const result = await signInWithPopup(auth, provider);
      const fireBaseData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        token: await result.user.getIdToken(),
      };

      navigate('/Home', { state: { fireBaseData } });
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <div>
      <h1>React Firebase App</h1>
      <button onClick={handleLogin}>Login with Google</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
