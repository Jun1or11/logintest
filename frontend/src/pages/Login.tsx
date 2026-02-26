import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";


function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(usuario, password);
      navigate("/timer"); // ir a la otra página
    } catch {
      setMensaje("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "300px" }}>
      <h2>Login</h2>

      <input
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Ingresar</button>
      <p>{mensaje}</p>
    </div>
  );
}

export default Login;
