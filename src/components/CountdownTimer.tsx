import React, { useState, useEffect, useRef } from "react";

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const timerRef = useRef<number>();
  const startTime = useRef<number>(60);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0 || isActive === false) {
      clearInterval(timerRef.current);
      setIsActive(false);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  return (
    <div>
      <h1>Nedräkningstimer</h1>
      <input
        type="text"
        onChange={(e) => (startTime.current = parseInt(e.target.value))}
      />
      <button
        onClick={() => {
          setIsActive(false);
          setTimeLeft(startTime.current);
        }}
      >
        Uppdatera starttid
      </button>
      <h2>{timeLeft} sekunder kvar</h2>
      <button onClick={() => setIsActive(true)}>Starta</button>
      <button onClick={() => setIsActive(false)}>Pausa</button>
      <button
        onClick={() => {
          setIsActive(false);
          setTimeLeft(startTime.current);
        }}
      >
        Återställ
      </button>
      <p>{timeLeft === 0 ? "Tidens slut!" : ""}</p>
    </div>
  );
}
