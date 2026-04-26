import { useState } from "react";
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
    channel: "Google Meet ou Discord",
    format: "Sessões individuais de 45 minutos",
    instructions: "Envie sua principal dúvida e links do projeto antes da conversa.",
  },
  {
    name: "Carlos Mendes",
    role: "Backend e DevOps",
    tags: ["Node.js", "PostgreSQL", "Docker"],
    rating: "4.9 / 5.0",
    sessions: "62 sessões realizadas",
    availability: "Tardes",
    channel: "Google Meet",
    format: "Revisão de arquitetura e pareamento",
    instructions: "Informe o contexto da API ou infraestrutura que deseja revisar.",
  },
  {
    name: "Beatriz Lima",
    role: "Full Stack e Cloud",
    tags: ["JavaScript", "React", "AWS"],
    rating: "4.7 / 5.0",
    sessions: "38 sessões realizadas",
    availability: "Manhãs",
    channel: "Discord",
    format: "Sessão de dúvidas e plano de estudos",
    instructions: "Liste os temas de cloud ou full stack que quer priorizar.",
  },
  {
    name: "Ricardo Santos",
    role: "Data Science e ML",
    tags: ["Python", "Django", "Machine Learning"],
    rating: "4.9 / 5.0",
    sessions: "51 sessões realizadas",
    availability: "Noites",
    channel: "Google Meet",
    format: "Mentoria guiada por notebook ou projeto",
    instructions: "Prepare o dataset ou problema de machine learning que deseja discutir.",
  },
  {
    name: "Juliana Rocha",
    role: "Frontend e UI/UX",
    tags: ["Vue", "Nuxt", "Tailwind CSS"],
    rating: "4.6 / 5.0",
    sessions: "29 sessões realizadas",
    availability: "Fins de semana",
    channel: "Discord ou Meet",
    format: "Análise de interface e carreira",
    instructions: "Compartilhe referências, protótipos ou dúvidas de UI/UX.",
  },
  {
    name: "Fernando Alves",
    role: "Arquitetura Enterprise",
    tags: ["Java", "Spring Boot", "Microservices"],
    rating: "4.8 / 5.0",
    sessions: "47 sessões realizadas",
    availability: "Tardes e noites",
    channel: "Google Meet",
    format: "Discussão técnica e desenho de solução",
    instructions: "Descreva o problema de arquitetura antes da sessão.",
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
  const [preferences, setPreferences] = useState({
    availability: "Noites e fins de semana",
    channel: "Google Meet ou Discord",
    format: "Sessões individuais de 45 minutos",
    instructions: "Envie sua principal dúvida e links do projeto antes da conversa.",
  });
  const [isPreferencesSaved, setIsPreferencesSaved] = useState(false);

  function handlePreferencesSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setPreferences({
      availability: String(formData.get("availability") || "").trim(),
      channel: String(formData.get("channel") || "").trim(),
      format: String(formData.get("format") || "").trim(),
      instructions: String(formData.get("instructions") || "").trim(),
    });
    setIsPreferencesSaved(true);
  }

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
        <h2 style={{ fontSize: 20, marginBottom: 10 }}>Preferências das sessões</h2>
        <p className="page-subtitle">
          Estes dados aparecem para o aluno quando ele solicitar uma mentoria com você.
        </p>

        <form className="mentor-preferences-form" onSubmit={handlePreferencesSubmit}>
          <div className="input-group">
            <label>Disponibilidade</label>
            <input name="availability" defaultValue={preferences.availability} placeholder="Ex: Noites e fins de semana" />
          </div>

          <div className="input-group">
            <label>Canal da sessão</label>
            <input name="channel" defaultValue={preferences.channel} placeholder="Ex: Google Meet, Discord, WhatsApp" />
          </div>

          <div className="input-group">
            <label>Formato</label>
            <input name="format" defaultValue={preferences.format} placeholder="Ex: Sessões individuais de 45 minutos" />
          </div>

          <div className="input-group">
            <label>Orientações para o aluno</label>
            <textarea
              name="instructions"
              defaultValue={preferences.instructions}
              placeholder="Explique o que o aluno deve enviar antes da sessão"
              rows="5"
            />
          </div>

          <div className="mentor-preferences-actions">
            {isPreferencesSaved && <span className="status-badge">Preferências salvas</span>}
            <Button className="btn--primary" type="submit">
              Salvar preferências
            </Button>
          </div>
        </form>
      </section>
    </Layout>
  );
}

export default function Mentors() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [requestedMentor, setRequestedMentor] = useState(null);

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
              <span>Canal: {mentor.channel}</span>
            </div>
            <Button className="btn--primary" onClick={() => setSelectedMentor(mentor)}>
              Agendar Sessão
            </Button>
          </article>
        ))}
      </div>

      <section className="card wide-card">
        <h2 style={{ fontSize: 20, marginBottom: 24 }}>Avaliar Mentoria</h2>
        <Button>Deixar Feedback</Button>
      </section>

      {selectedMentor && (
        <MentorshipRequestModal
          mentor={selectedMentor}
          onClose={() => setSelectedMentor(null)}
          onConfirm={() => {
            setRequestedMentor(selectedMentor);
            setSelectedMentor(null);
          }}
        />
      )}

      {requestedMentor && (
        <div className="modal-backdrop" role="presentation" onClick={() => setRequestedMentor(null)}>
          <section
            className="card modal-card modal-card--small"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mentorship-request-sent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2 id="mentorship-request-sent">Solicitação enviada</h2>
                <p className="page-subtitle">{requestedMentor.name}</p>
              </div>
            </div>

            <p className="modal-message">
              Sua solicitação de mentoria foi enviada. Aguarde o mentor aprovar e combinar os detalhes da sessão fora da
              plataforma.
            </p>

            <div className="modal-actions">
              <Button className="btn--primary" onClick={() => setRequestedMentor(null)}>
                Entendi
              </Button>
            </div>
          </section>
        </div>
      )}
    </Layout>
  );
}

function MentorshipRequestModal({ mentor, onClose, onConfirm }) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm();
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="card modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mentorship-request-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2 id="mentorship-request-title">Solicitar mentoria com {mentor.name}</h2>
            <p className="page-subtitle">As sessões acontecem fora da plataforma</p>
          </div>
        </div>

        <div className="mentor-session-summary">
          <p>
            Após sua solicitação, o mentor poderá aprovar o pedido e combinar canal, horário e formato da conversa
            conforme as preferências abaixo.
          </p>

          <div className="mentor-session-details">
            <div>
              <strong>Disponibilidade</strong>
              <span>{mentor.availability}</span>
            </div>
            <div>
              <strong>Canal</strong>
              <span>{mentor.channel}</span>
            </div>
            <div>
              <strong>Formato</strong>
              <span>{mentor.format}</span>
            </div>
            <div>
              <strong>Orientações</strong>
              <span>{mentor.instructions}</span>
            </div>
          </div>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Mensagem para o mentor</label>
            <textarea name="message" placeholder="Conte brevemente o que você quer estudar ou resolver..." rows="5" />
          </div>

          <div className="modal-actions">
            <Button onClick={onClose}>Cancelar</Button>
            <Button className="btn--primary" type="submit">
              Solicitar mentoria
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
