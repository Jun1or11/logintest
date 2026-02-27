import { useState } from "react";
import "./timer.css";

const Timer = () => {
  const [activo, setActivo] = useState(false);

  const activar = () => {
    setActivo(true);

    const audio = new Audio("/scream.mp3");
    audio.play().catch((err) => console.log(err));
  };

  return (
    <div className={`container ${activo ? "flash" : ""}`}>
      {!activo && (
        <button className="boton" onClick={activar}>
          Presióname
        </button>
      )}
    </div>
  );
};

export default Timer;
