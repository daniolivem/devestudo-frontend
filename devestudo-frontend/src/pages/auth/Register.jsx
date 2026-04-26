import "./Register.css";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function Register() {
  return (
    <div className="register">
      <div className="container">
        <h1>Crie sua conta</h1>
        <p className="subtitle">Preencha seus dados</p>

        <form className="form">
          <Input label="Email" type="email" placeholder="seu@email.com" />
          <Input label="Name" placeholder="Seu nome" />
          <Input label="Telefone" placeholder="(00) 0000-0000" />
          <Input label="Senha" type="password" />
          <Input label="Confirmar Senha" type="password" />

          <Button>Criar Conta</Button>
        </form>
      </div>
    </div>
  );
}