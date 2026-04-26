import { useSearchParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Button from "../../components/ui/Button";

const mentors = [
  {
    name: "Ana Costa",
    role: "Frontend Development",
    tags: ["React", "TypeScript", "Next.js"],
    rating: "4.8 / 5.0",
    sessions: "45 sessões realizadas",
    availability: "Noites e fins de semana",
  },
  {
    name: "Carlos Mendes",
    role: "Backend e DevOps",
    tags: ["Node.js", "PostgreSQL", "Docker"],
    rating: "4.9 / 5.0",
    sessions: "62 sessões realizadas",
    availability: "Tardes",
  },
  {
    name: "Beatriz Lima",
    role: "Full Stack e Cloud",
    tags: ["JavaScript", "React", "AWS"],
    rating: "4.7 / 5.0",
    sessions: "38 sessões realizadas",
    availability: "Manhãs",
  },
  {
    name: "Ricardo Santos",
    role: "Data Science e ML",
    tags: ["Python", "Django", "Machine Learning"],
    rating: "4.9 / 5.0",
    sessions: "51 sessões realizadas",
    availability: "Noites",
  },
  {
    name: "Juliana Rocha",
    role: "Frontend e UI/UX",
    tags: ["Vue", "Nuxt", "Tailwind CSS"],
    rating: "4.6 / 5.0",
    sessions: "29 sessões realizadas",
    availability: "Fins de semana",
  },
  {
    name: "Fernando Alves",
    role: "Arquitetura Enterprise",
    tags: ["Java", "Spring Boot", "Microservices"],
    rating: "4.8 / 5.0",
    sessions: "47 sessões realizadas",
    availability: "Tardes e noites",
  },
];

const students = [
  { name: "Patrícia Melo", role: "Frontend Development", tags: ["React", "TypeScript", "Next.js"], sessions: 45 },
  { name: "Ronaldo Lima", role: "Backend e DevOps", tags: ["Node.js", "PostgreSQL", "Docker"], sessions: 62 },
  { name: "Rogério Marques", role: "Backend e DevOps", tags: ["Node.js", "PostgreSQL", "Docker"], sessions: 32 },
  { name: "Charles Mendes", role: "Backend e DevOps", tags: ["Node.js", "PostgreSQL", "Docker"], sessions: 56 },
  { name: "Rogério Ceni", role: "Backend e DevOps", tags: ["Node.js", "PostgreSQL", "Docker"], sessions: 28 },
  { name: "Diego Teles", role: "Backend e DevOps", tags: ["Node.js", "PostgreSQL", "Docker"], sessions: 34 },
];

function MentorStudents() {
  return (
    <Layout>
      <header className="page-header">
        <h1 className="page-title">Sistema de Mentoria Alunos</h1>
        <p className="page-subtitle">Alunos em sua mentoria</p>
      </header>

      <div className="grid-2">
        {students.map((student) => (
          <article className="card mentor-card" key={student.name}>
            <h2>{student.name}</h2>
            <p className="mentor-copy">{student.role}</p>
            <div className="chip-list">
              {student.tags.map((tag) => (
                <span className="chip" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="mentor-stats">
              <strong>
                0 mensagens <Button className="btn--primary btn--small">Responder</Button>
              </strong>
              <span className="soft">{student.sessions} sessões realizadas</span>
              <span>Offline</span>
            </div>
            <div className="group-actions">
              <Button className="btn--primary">Bloquear</Button>
              <Button className="btn--primary">Excluir</Button>
            </div>
          </article>
        ))}
      </div>

      <section className="card wide-card">
        <h2 style={{ fontSize: 20, marginBottom: 24 }}>Adicionar aluno</h2>
        <Button>+Adicionar</Button>
      </section>
    </Layout>
  );
}

export default function Mentors() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  if (role === "admin" || role === "mentor") {
    return <MentorStudents />;
  }

  return (
    <Layout>
      <header className="page-header">
        <h1 className="page-title">Sistema de Mentoria</h1>
        <p className="page-subtitle">Conecte-se com mentores especializados na sua stack</p>
      </header>

      <div className="grid-2">
        {mentors.map((mentor) => (
          <article className="card mentor-card" key={mentor.name}>
            <h2>{mentor.name}</h2>
            <p className="mentor-copy">{mentor.role}</p>
            <div className="chip-list">
              {mentor.tags.map((tag) => (
                <span className="chip" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="mentor-stats">
              <strong>★ {mentor.rating}</strong>
              <span className="soft">{mentor.sessions}</span>
              <span>
                Disponível: <span>{mentor.availability}</span>
              </span>
            </div>
            <Button className="btn--primary">Agendar Sessão</Button>
          </article>
        ))}
      </div>

      <section className="card wide-card">
        <h2 style={{ fontSize: 20, marginBottom: 24 }}>Avaliar Mentoria</h2>
        <Button>Deixar Feedback</Button>
      </section>
    </Layout>
  );
}
