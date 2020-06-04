import { useState, useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function useCountdown() {
  const [count, setCount] = useState(3);
  const [isRunning, setIsRunning] = useState(false);

  // Reset countdown after hitting 0
  useEffect(() => {
    if (count === 0) {
      setIsRunning(false);
      setCount(3);
    }
  }, [count]);

  useInterval(
    () => {
      setCount(count - 1);
    },
    isRunning ? 750 : null
  );

  function startCountdown() {
    setIsRunning(true);
  }

  return [count, isRunning, startCountdown];
}
