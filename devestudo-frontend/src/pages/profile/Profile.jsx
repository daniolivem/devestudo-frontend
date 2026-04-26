import Layout from "../../components/layout/Layout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const technologies = [
  "React",
  "JavaScript",
  "Node.js",
  "Python",
  "Java",
  "TypeScript",
  "Angular",
  "Vue",
  "PHP",
  "Ruby",
  "Go",
  "Rust",
  "Next.js",
  "Django",
  "Spring Boot",
  "PostgreSQL",
];

const checked = new Set(["React", "JavaScript", "Node.js"]);

export default function Profile() {
  return (
    <Layout>
      <header className="page-header">
        <h1 className="page-title">Gerenciamento de Perfil</h1>
        <p className="page-subtitle">Atualize suas informações e preferências</p>
      </header>

      <form className="profile-form">
        <section className="card profile-section">
          <h2>Informações Básicas</h2>
          <div className="stack">
            <Input label="Nome Completo" defaultValue="João Silva" />
            <Input label="E-mail" type="email" defaultValue="joao@exemplo.com" />
          </div>
        </section>

        <section className="card profile-section">
          <h2>Tecnologias de Interesse</h2>
          <p className="page-subtitle">Selecione as tecnologias que você estuda ou tem interesse</p>
          <div className="checkbox-grid">
            {technologies.map((technology) => (
              <label key={technology}>
                <input type="checkbox" defaultChecked={checked.has(technology)} />
                {technology}
              </label>
            ))}
          </div>
        </section>

        <section className="card profile-section">
          <h2>Nível de Conhecimento</h2>
          <select className="field-input" defaultValue="Intermediário" style={{ width: 130 }}>
            <option>Iniciante</option>
            <option>Intermediário</option>
            <option>Avançado</option>
          </select>
        </section>

        <section className="card profile-section">
          <h2>Redes Sociais</h2>
          <div className="stack">
            <Input label="GitHub" defaultValue="joaosilva" />
            <Input label="LinkedIn" defaultValue="joao-silva" />
          </div>
        </section>

        <div className="profile-actions">
          <Button className="btn--primary" type="submit">
            Salvar Alterações
          </Button>
          <Button>Cancelar</Button>
        </div>
      </form>
    </Layout>
  );
}
