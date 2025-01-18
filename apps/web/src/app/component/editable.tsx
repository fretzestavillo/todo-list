import { useEffect, useRef, useState } from 'react';
import '../component/style.css';

export function EditableText() {
  const demoRef = useRef<HTMLParagraphElement | null>(null);
  const pratice = useRef<HTMLTextAreaElement | null>(null);
  const [lastKey, setLastKey] = useState<string>('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
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
    };
  }, [lastKey]);

  function lastKeyfunction(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    setLastKey(event.key);
  }

  function delayedFunction() {
    console.log(`Function called after 3 seconds: Last key was "${lastKey}"`);
  }

  return (
    <>
      <div>
        <h1 ref={demoRef}>Title</h1>
        <textarea
          className="inputStyle"
          ref={pratice}
          onKeyDown={lastKeyfunction}
        />
      </div>
    </>
  );
}
