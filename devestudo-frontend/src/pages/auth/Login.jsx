import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    // fake login
    navigate("/dashboard");
  }

  return (
    <div className="home">
      <div className="container">
        <h1>Comunidade DevEstudo</h1>

        <p className="subtitle">
          Faça login para continuar
        </p>

        <form className="form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>E-mail</label>
            <input type="email" placeholder="seu@email.com" />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <button type="submit">Entrar</button>
        </form>

        <div className="links">
          <Link to="/forgot-password">Esqueci minha senha</Link>
          <Link to="/register">Criar conta</Link>
        </div>

        <p className="admin">Login Administrativo</p>
      </div>
    </div>
  );
}