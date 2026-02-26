import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import "./login.css";

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setMensaje("");
    setLoading(true);

    try {
      await login(usuario, password);
      navigate("/timer");
    } catch {
      setMensaje("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <input
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          disabled={loading}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <br /><br />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="login-button"
        >
          {loading ? (
            <span className="button-content">
              Conectando...
              <span className="spinner small">
                <span className="double-bounce1"></span>
                <span className="double-bounce2"></span>
              </span>
            </span>
          ) : (
            "Ingresar"
          )}
        </button>

        {/* Siempre reservamos espacio para el mensaje */}
        <p className="login-message">{mensaje || "\u00A0"}</p>
      </div>
    </div>
  );
};

export default Login;
