import { useEffect, useState } from "react";
import "./timer.css";

const segmentMap: Record<string, string[]> = {
  "0": ["a", "b", "c", "d", "e", "f"],
  "1": ["b", "c"],
  "2": ["a", "b", "g", "e", "d"],
  "3": ["a", "b", "c", "d", "g"],
  "4": ["f", "g", "b", "c"],
  "5": ["a", "f", "g", "c", "d"],
  "6": ["a", "f", "e", "d", "c", "g"],
  "7": ["a", "b", "c"],
  "8": ["a", "b", "c", "d", "e", "f", "g"],
  "9": ["a", "b", "c", "d", "f", "g"],
};

const Digit: React.FC<{ value: string }> = ({ value }) => {
  const segments = segmentMap[value] || [];

  return (
    <div className="digit">
      {["a", "b", "c", "d", "e", "f", "g"].map((s) => (
        <div
          key={s}
          className={`segment ${s} ${
            segments.includes(s) ? "on" : "off"
          }`}
        />
      ))}
    </div>
  );
};

const SevenSegmentClock: React.FC = () => {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setHora(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const format = (num: number) => String(num).padStart(2, "0");

  const h = format(hora.getHours());
  const m = format(hora.getMinutes());
  const s = format(hora.getSeconds());

  return (
    <div className="clock">
      <Digit value={h[0]} />
      <Digit value={h[1]} />
      <div className="colon-dots"></div>
      <Digit value={m[0]} />
      <Digit value={m[1]} />
      <div className="colon-dots"></div>
      <Digit value={s[0]} />
      <Digit value={s[1]} />
    </div>
  );
};

export default SevenSegmentClock;
