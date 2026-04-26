import Layout from "../../components/layout/Layout";
import Button from "../../components/ui/Button";

const groups = [
  { name: "React Avançado", members: "12 membros", status: "Ativo" },
  { name: "JavaScript Fundamentals", members: "8 membros", status: "Pendente" },
  { name: "Node.js API Development", members: "15 membros", status: "Ativo" },
];

const topics = [
  { title: "Como implementar hooks personalizados em React?", tags: ["React", "JavaScript"], replies: 23 },
  { title: "Diferença entre var, let e const", tags: ["JavaScript"], replies: 45 },
  { title: "Boas práticas com async/await", tags: ["JavaScript", "Node.js"], replies: 18 },
  { title: "Redux vs Context API: quando usar?", tags: ["React"], replies: 31 },
  { title: "Configurando TypeScript no Node.js", tags: ["Node.js"], replies: 12 },
];

const mentors = [
  { name: "Ana Costa", tags: ["React", "TypeScript", "Next.js"], rating: "4.8 / 5.0" },
  { name: "Carlos Mendes", tags: ["Node.js", "PostgreSQL", "Docker"], rating: "4.9 / 5.0" },
  { name: "Beatriz Lima", tags: ["JavaScript", "React", "AWS"], rating: "4.7 / 5.0" },
];

export default function Dashboard() {
  return (
    <Layout>
      <header className="page-header">
        <h1 className="page-title">Bem-vindo(a), João Silva</h1>
        <p className="page-subtitle">Confira suas atividades e recomendações personalizadas</p>
      </header>

      <div className="grid-2">
        <section className="card dashboard-card">
          <h2>Meus Grupos</h2>
          <div className="list-divider">
            {groups.map((group) => (
              <article className="mini-row" key={group.name}>
                <div>
                  <p className="mini-title">{group.name}</p>
                  <p className="mini-meta">{group.members}</p>
                </div>
                <span className="status-badge">{group.status}</span>
              </article>
            ))}
          </div>
          <Button className="full-button">Ver todos os grupos</Button>
        </section>

        <section className="card dashboard-card">
          <h2>Fórum Hoje</h2>
          <div className="list-divider">
            {topics.map((topic) => (
              <article className="forum-row" key={topic.title}>
                <div>
                  <p className="mini-title">{topic.title}</p>
                  <div className="chip-list" style={{ marginTop: 10 }}>
                    {topic.tags.map((tag) => (
                      <span className="chip" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mini-meta">
                  {topic.replies}
                  <br />
                  respostas
                </p>
              </article>
            ))}
          </div>
          <Button className="full-button">Ir para o Fórum</Button>
        </section>
      </div>

      <section className="mentors-home">
        <h2 style={{ fontSize: 16, marginBottom: 14 }}>Mentores Disponíveis</h2>
        <div className="list-divider">
          {mentors.map((mentor) => (
            <article className="mentor-home-item" key={mentor.name}>
              <p className="mini-title">{mentor.name}</p>
              <div className="chip-list" style={{ marginTop: 10 }}>
                {mentor.tags.map((tag) => (
                  <span className="chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mentor-rating">★ {mentor.rating}</p>
            </article>
          ))}
        </div>
        <Button className="full-button">Ver todos os mentores</Button>
      </section>
    </Layout>
  );
}
