import { useState, useEffect, useRef } from "react";

const CountDown = ({ onTimeUp, isQuizFinished }) => {
  const [count, setCount] = useState(600);
  const hasSubmitted = useRef(false);

  useEffect(() => {
    if (isQuizFinished || count === 0) {
      if (count === 0 && !hasSubmitted.current) {
        hasSubmitted.current = true;
        onTimeUp();
      }
      return;
    }

    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [count, isQuizFinished, onTimeUp]);

  const toHHMMSS = (secs) => {
    const sec_num = parseInt(secs, 10);
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  return <div className="countdown-container">{toHHMMSS(count)}</div>;
};

export default CountDown;
