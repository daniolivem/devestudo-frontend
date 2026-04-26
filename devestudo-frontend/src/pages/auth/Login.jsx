import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Comunidade DevEstudo</h1>
        <p className="auth-subtitle">Faça login para continuar</p>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>E-mail</label>
            <input type="email" placeholder="seu@email.com" />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <button className="btn btn--primary" type="submit">
            Entrar
          </button>
        </form>

        <div className="auth-actions">
          <Link to="/forgot-password">Esqueci minha senha</Link>
          <Link to="/register">Criar conta</Link>
        </div>

        <Link className="admin-link" to="/dashboard?role=admin">
          Login Administrativo
        </Link>
      </div>
    </div>
  );
}
