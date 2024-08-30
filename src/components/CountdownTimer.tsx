import { useState, useEffect, useRef, FormEvent } from "react";

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const timerRef = useRef<number>();
  const startTime = useRef<number>(60);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTime.current = (
      (event.target as HTMLFormElement).inputNumber as HTMLInputElement
    ).valueAsNumber;
    resetTimer();
  }

  function resetTimer() {
    setIsActive(false);
    setTimeLeft(startTime.current);
  }

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
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="number" name="inputNumber" />
        <button type="submit">Uppdatera starttid</button>
      </form>
      <h2>{timeLeft} sekunder kvar</h2>
      <button onClick={() => setIsActive(true)}>Starta</button>
      <button onClick={() => setIsActive(false)}>Pausa</button>
      <button onClick={resetTimer}>Återställ</button>
      <p>{timeLeft === 0 ? "Tidens slut!" : ""}</p>
    </div>
  );
}
