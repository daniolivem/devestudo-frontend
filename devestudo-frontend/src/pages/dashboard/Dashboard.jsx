import { useSearchParams } from "react-router-dom";
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

const newUsers = [
  ["Ana Souza", "Estudante"],
  ["Pedro Lima", "Tutor"],
  ["Mariana Alves", "Estudante"],
  ["Lucas Ribeiro", "Professor"],
  ["Sofia Mendes", "Estudante"],
];

function AdminDashboard() {
  return (
    <Layout>
      <div className="stats-row">
        <article className="card stat-card">
          <span className="stat-icon">◼</span>
          <div>
            <p>Tópicos em Fóruns</p>
            <strong>1,320</strong>
          </div>
        </article>
        <article className="card stat-card">
          <span className="stat-icon">●</span>
          <div>
            <p>Total de Usuários</p>
            <strong>8,250</strong>
          </div>
        </article>
        <article className="card stat-card">
          <span className="stat-icon">●</span>
          <div>
            <p>Grupos Ativos</p>
            <strong>540</strong>
          </div>
        </article>
      </div>

      <div className="grid-2">
        <section className="card admin-panel">
          <h2>Usuários</h2>
          <div className="admin-panel-title">
            <strong>Novos Usuários</strong>
            <span>Ver Todos ›</span>
          </div>
          <div className="list-divider">
            {newUsers.map(([name, role]) => (
              <article className="user-row" key={name}>
                <span className="avatar" />
                <div>
                  <p>{name}</p>
                  <span className="role-pill">{role}</span>
                </div>
                <span>Há 2 horas</span>
              </article>
            ))}
          </div>
          <div className="card admin-stats">
            <h3>Estatísticas dos Grupos</h3>
            <p>Grupos Ativos: <strong>540</strong></p>
            <p>Discussões: <strong>2,430</strong></p>
            <p>Membros Online: <strong>865</strong></p>
          </div>
        </section>

        <section className="card admin-panel">
          <div className="admin-panel-title">
            <h2>Meus Grupos</h2>
            <Button className="btn--small">CRIAR GRUPO</Button>
          </div>
          <h3>MEMBROS</h3>
          <div className="mock-table">
            {[1, 2, 3, 4, 5].map((item) => (
              <div className="mock-row" key={item}>
                <span className="avatar avatar--small" />
                <span />
                <span />
                <div>
                  <Button className="btn--small">BLOQUEAR</Button>
                  <Button className="btn--small">REMOVER MEMBRO</Button>
                </div>
              </div>
            ))}
          </div>
          <div className="admin-panel-title" style={{ marginTop: 24 }}>
            <h3>FÓRUNS</h3>
            <Button className="btn--small">ADICIONAR FÓRUM</Button>
          </div>
          <div className="mock-table">
            {[1, 2].map((item) => (
              <div className="mock-row mock-row--forum" key={item}>
                <span />
                <strong>0</strong>
                <div>
                  <Button className="btn--small">ADICIONAR</Button>
                  <Button className="btn--small">EXCLUIR FÓRUM</Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  if (searchParams.get("role") === "admin") {
    return <AdminDashboard />;
  }

  return (
    <Layout>
      <header className="page-header">
        <h1 className="page-title">Bem-vindo(a), João Silva</h1>
        <p className="page-subtitle">Confira suas atividades e recomendações personalizadas</p>
      </header>

      <div className="dashboard-grid">
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

        <section className="card dashboard-card">
          <h2>Mentores Disponíveis</h2>
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
      </div>
    </Layout>
  );
}
