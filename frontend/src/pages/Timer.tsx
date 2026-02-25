import { useEffect, useState } from "react";

function Timer() {
  const [segundos, setSegundos] = useState(60);

  useEffect(() => {
    if (segundos === 0) return;

    const interval = setInterval(() => {
      setSegundos((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [segundos]);

  const minutos = String(Math.floor(segundos / 60)).padStart(2, "0");
  const seg = String(segundos % 60).padStart(2, "0");

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ fontSize: "64px" }}>
        {minutos}:{seg}
      </h1>
      <p>Cuenta regresiva</p>
    </div>
  );
}

export default Timer;