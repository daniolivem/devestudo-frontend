import "./ForgotPassword.css";

export default function ForgotPassword() {
  return (
    <div className="auth-page">
      <div className="auth-card auth-card--compact">
        <h1 className="auth-title">Recuperar Senha</h1>
        <p className="auth-subtitle">Informe o E-mail para recuperação de senha</p>

        <form className="auth-form">
          <div className="input-group">
            <label>E-mail</label>
            <input type="email" placeholder="seu@email.com" />
          </div>

          <button className="btn btn--primary" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
