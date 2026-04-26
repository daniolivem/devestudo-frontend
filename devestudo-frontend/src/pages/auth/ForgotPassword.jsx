import "./ForgotPassword.css";

export default function ForgotPassword() {
  return (
    <div className="forgot-password">
      <div className="container">
        <h1>Resetar Senha</h1>

        <p className="subtitle">
          Informe o e-mail para recuperação de senha
        </p>

        <form className="form">
          <label>Email</label>
          <input type="email" placeholder="your@email.com" />

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}