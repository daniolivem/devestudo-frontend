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

const mentorshipStatus = {
  REQUESTED: {
    label: "Solicitada",
    description: "Aguardando aprovação do mentor.",
  },
  APPROVED: {
    label: "Aprovada",
    description: "O mentor aprovou sua solicitação. Combine os detalhes pelo canal informado.",
  },
  COMPLETED: {
    label: "Concluída",
    description: "Mentoria finalizada.",
  },
  CANCELLED: {
    label: "Cancelada",
    description: "Solicitação cancelada ou recusada.",
  },
};

const initialMentorships = [
  {
    mentorName: "Carlos Mendes",
    role: "Backend e DevOps",
    status: "APPROVED",
    channel: "Google Meet",
    availability: "Tardes",
    format: "Revisão de arquitetura e pareamento",
  },
];

const initialMentorRequests = [
  {
    id: "request-1",
    studentName: "João Silva",
    topic: "React Hooks e organização de componentes",
    status: "REQUESTED",
    message: "Quero revisar um projeto pessoal e entender melhor quando criar hooks customizados.",
  },
  {
    id: "request-2",
    studentName: "Mariana Alves",
    topic: "TypeScript no frontend",
    status: "REQUESTED",
    message: "Tenho dúvidas sobre tipagem de props e chamadas de API.",
  },
];

function MentorStudents() {
  const [preferences, setPreferences] = useState({
    availability: "Noites e fins de semana",
    channel: "Google Meet ou Discord",
    format: "Sessões individuais de 45 minutos",
    instructions: "Envie sua principal dúvida e links do projeto antes da conversa.",
  });
  const [isPreferencesSaved, setIsPreferencesSaved] = useState(false);
  const [mentorRequests, setMentorRequests] = useState(initialMentorRequests);

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

  function updateRequestStatus(requestId, status) {
    setMentorRequests((currentRequests) =>
      currentRequests.map((request) => (request.id === requestId ? { ...request, status } : request)),
    );
  }

  return (
    <Layout>
      <header className="page-header">
        <h1 className="page-title">Sistema de Mentoria Alunos</h1>
        <p className="page-subtitle">Alunos em sua mentoria</p>
      </header>

      <section className="card mentorship-status-panel">
        <div className="mentorship-section-header">
          <div>
            <h2>Solicitações recebidas</h2>
            <p className="page-subtitle">Aprove ou recuse pedidos de mentoria dos alunos.</p>
          </div>
        </div>

        <div className="list-divider">
          {mentorRequests.map((request) => (
            <article className="mentorship-row" key={request.id}>
              <div>
                <h3>{request.studentName}</h3>
                <p className="mini-meta">{request.topic}</p>
                <p className="mentorship-message">{request.message}</p>
              </div>

              <span className="status-badge">{mentorshipStatus[request.status].label}</span>

              {request.status === "REQUESTED" ? (
                <div className="mentorship-actions">
                  <Button className="btn--primary btn--small" onClick={() => updateRequestStatus(request.id, "APPROVED")}>
                    Aprovar
                  </Button>
                  <Button className="btn--small" onClick={() => updateRequestStatus(request.id, "CANCELLED")}>
                    Recusar
                  </Button>
                </div>
              ) : (
                <p className="mini-meta">{mentorshipStatus[request.status].description}</p>
              )}
            </article>
          ))}
        </div>
      </section>

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

function AdminMentorshipManagement() {
  const [mentorRequests, setMentorRequests] = useState(initialMentorRequests);
  const [managedMentors, setManagedMentors] = useState(mentors);
  const [editingMentor, setEditingMentor] = useState(null);
  const [adminPreferences, setAdminPreferences] = useState({
    availability: "Tardes e noites",
    channel: "Google Meet",
    format: "Sessões individuais de 45 minutos",
    instructions: "Envie contexto, links e objetivo da conversa antes da sessão.",
  });
  const [isPreferencesSaved, setIsPreferencesSaved] = useState(false);

  function updateRequestStatus(requestId, status) {
    setMentorRequests((currentRequests) =>
      currentRequests.map((request) => (request.id === requestId ? { ...request, status } : request)),
    );
  }

  function handleMentorSave(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const originalName = String(formData.get("originalName") || "");
    const name = String(formData.get("name") || "").trim();
    const role = String(formData.get("role") || "").trim();
    const tags = String(formData.get("tags") || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    const availability = String(formData.get("availability") || "").trim();
    const channel = String(formData.get("channel") || "").trim();
    const format = String(formData.get("format") || "").trim();
    const instructions = String(formData.get("instructions") || "").trim();

    if (!name || !role) {
      return;
    }

    const savedMentor = {
      name,
      role,
      tags,
      rating: editingMentor?.rating || "Novo",
      sessions: editingMentor?.sessions || "0 sessões realizadas",
      availability,
      channel,
      format,
      instructions,
    };

    setManagedMentors((currentMentors) => {
      if (!originalName) {
        return [savedMentor, ...currentMentors];
      }

      return currentMentors.map((mentor) => (mentor.name === originalName ? savedMentor : mentor));
    });
    setEditingMentor(null);
  }

  function handleAdminPreferencesSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setAdminPreferences({
      availability: String(formData.get("availability") || "").trim(),
      channel: String(formData.get("channel") || "").trim(),
      format: String(formData.get("format") || "").trim(),
      instructions: String(formData.get("instructions") || "").trim(),
    });
    setIsPreferencesSaved(true);
  }

  function deleteMentor(mentorName) {
    setManagedMentors((currentMentors) => currentMentors.filter((mentor) => mentor.name !== mentorName));
  }

  return (
    <Layout>
      <header className="page-header mentors-admin-header">
        <div>
          <h1 className="page-title">Gestão de Mentoria</h1>
          <p className="page-subtitle">Gerencie solicitações, mentores cadastrados e suas preferências como mentor.</p>
        </div>
        <Button className="btn--primary" onClick={() => setEditingMentor({})}>
          Cadastrar mentor
        </Button>
      </header>

      <section className="card mentorship-status-panel">
        <div className="mentorship-section-header">
          <div>
            <h2>Solicitações de mentoria</h2>
            <p className="page-subtitle">Controle aprovações, recusas e acompanhamento dos pedidos.</p>
          </div>
        </div>

        <div className="mentorship-list-scroll list-divider">
          {mentorRequests.map((request) => (
            <article className="mentorship-row" key={request.id}>
              <div>
                <h3>{request.studentName}</h3>
                <p className="mini-meta">{request.topic}</p>
                <p className="mentorship-message">{request.message}</p>
              </div>

              <span className="status-badge">{mentorshipStatus[request.status].label}</span>

              {request.status === "REQUESTED" ? (
                <div className="mentorship-actions">
                  <Button className="btn--primary btn--small" onClick={() => updateRequestStatus(request.id, "APPROVED")}>
                    Aprovar
                  </Button>
                  <Button className="btn--small" onClick={() => updateRequestStatus(request.id, "CANCELLED")}>
                    Recusar
                  </Button>
                </div>
              ) : (
                <p className="mini-meta">{mentorshipStatus[request.status].description}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="card admin-mentors-panel">
        <div className="mentorship-section-header">
          <div>
            <h2>Mentores cadastrados</h2>
            <p className="page-subtitle">Edite disponibilidade, canais, stacks e remova cadastros quando necessário.</p>
          </div>
        </div>

        <div className="admin-mentors-head">
          <span>Mentor</span>
          <span>Disponibilidade</span>
          <span>Canal</span>
          <span>Ações</span>
        </div>

        <div className="list-divider">
          {managedMentors.map((mentor) => (
            <article className="admin-mentor-row" key={mentor.name}>
              <div>
                <h3>{mentor.name}</h3>
                <p className="mini-meta">{mentor.role}</p>
                <div className="chip-list">
                  {mentor.tags.map((tag) => (
                    <span className="chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span>{mentor.availability}</span>
              <span>{mentor.channel}</span>
              <div className="mentorship-actions">
                <Button className="btn--small" onClick={() => setEditingMentor(mentor)}>
                  Editar
                </Button>
                <Button className="btn--small" onClick={() => deleteMentor(mentor.name)}>
                  Remover
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="card wide-card">
        <h2 style={{ fontSize: 20, marginBottom: 10 }}>Minhas preferências como mentor</h2>
        <p className="page-subtitle">
          Como administradores também podem atuar como mentores, estes dados aparecem para alunos que solicitarem sua
          mentoria.
        </p>

        <form className="mentor-preferences-form" onSubmit={handleAdminPreferencesSubmit}>
          <div className="grid-2">
            <div className="input-group">
              <label>Disponibilidade</label>
              <input name="availability" defaultValue={adminPreferences.availability} />
            </div>
            <div className="input-group">
              <label>Canal da sessão</label>
              <input name="channel" defaultValue={adminPreferences.channel} />
            </div>
          </div>

          <div className="input-group">
            <label>Formato</label>
            <input name="format" defaultValue={adminPreferences.format} />
          </div>

          <div className="input-group">
            <label>Orientações para o aluno</label>
            <textarea name="instructions" defaultValue={adminPreferences.instructions} rows="5" />
          </div>

          <div className="mentor-preferences-actions">
            {isPreferencesSaved && <span className="status-badge">Preferências salvas</span>}
            <Button className="btn--primary" type="submit">
              Salvar preferências
            </Button>
          </div>
        </form>
      </section>

      {editingMentor && (
        <div className="modal-backdrop" role="presentation" onClick={() => setEditingMentor(null)}>
          <section
            className="card modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mentor-edit-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2 id="mentor-edit-title">{editingMentor.name ? "Editar mentor" : "Cadastrar mentor"}</h2>
                <p className="page-subtitle">Atualize os dados exibidos para os alunos.</p>
              </div>
            </div>

            <form className="modal-form" onSubmit={handleMentorSave}>
              <input type="hidden" name="originalName" value={editingMentor.name || ""} />

              <div className="grid-2">
                <div className="input-group">
                  <label>Nome</label>
                  <input name="name" defaultValue={editingMentor.name || ""} />
                </div>
                <div className="input-group">
                  <label>Área</label>
                  <input name="role" defaultValue={editingMentor.role || ""} />
                </div>
              </div>

              <div className="input-group">
                <label>Tecnologias</label>
                <input name="tags" defaultValue={editingMentor.tags?.join(", ") || ""} placeholder="React, Node.js, Docker" />
              </div>

              <div className="grid-2">
                <div className="input-group">
                  <label>Disponibilidade</label>
                  <input name="availability" defaultValue={editingMentor.availability || ""} />
                </div>
                <div className="input-group">
                  <label>Canal</label>
                  <input name="channel" defaultValue={editingMentor.channel || ""} />
                </div>
              </div>

              <div className="input-group">
                <label>Formato</label>
                <input name="format" defaultValue={editingMentor.format || ""} />
              </div>

              <div className="input-group">
                <label>Orientações</label>
                <textarea name="instructions" defaultValue={editingMentor.instructions || ""} rows="5" />
              </div>

              <div className="modal-actions">
                <Button onClick={() => setEditingMentor(null)}>Cancelar</Button>
                <Button className="btn--primary" type="submit">
                  Salvar
                </Button>
              </div>
            </form>
          </section>
        </div>
      )}
    </Layout>
  );
}

export default function Mentors() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [requestedMentor, setRequestedMentor] = useState(null);
  const [studentMentorships, setStudentMentorships] = useState(initialMentorships);

  if (role === "admin") {
    return <AdminMentorshipManagement />;
  }

  if (role === "mentor") {
    return <MentorStudents />;
  }

  return (
    <Layout>
      <header className="page-header">
        <h1 className="page-title">Sistema de Mentoria</h1>
        <p className="page-subtitle">Conecte-se com mentores especializados na sua stack</p>
      </header>

      <section className="card mentorship-status-panel">
        <div className="mentorship-section-header">
          <div>
            <h2>Minhas mentorias</h2>
            <p className="page-subtitle">Acompanhe solicitações enviadas e mentorias aprovadas.</p>
          </div>
        </div>

        {studentMentorships.length > 0 ? (
          <div className="mentorship-list-scroll list-divider">
            {studentMentorships.map((mentorship) => (
              <article className="mentorship-row" key={`${mentorship.mentorName}-${mentorship.status}`}>
                <div>
                  <h3>{mentorship.mentorName}</h3>
                  <p className="mini-meta">{mentorship.role}</p>
                  <p className="mentorship-message">{mentorshipStatus[mentorship.status].description}</p>
                  {mentorship.status === "APPROVED" && (
                    <p className="mini-meta">
                      Canal: {mentorship.channel} • Disponibilidade: {mentorship.availability}
                    </p>
                  )}
                </div>
                <span className="status-badge">{mentorshipStatus[mentorship.status].label}</span>
              </article>
            ))}
          </div>
        ) : (
          <p className="modal-message">Você ainda não solicitou mentorias.</p>
        )}
      </section>

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
            setStudentMentorships((currentMentorships) => [
              {
                mentorName: selectedMentor.name,
                role: selectedMentor.role,
                status: "REQUESTED",
                channel: selectedMentor.channel,
                availability: selectedMentor.availability,
                format: selectedMentor.format,
              },
              ...currentMentorships,
            ]);
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
