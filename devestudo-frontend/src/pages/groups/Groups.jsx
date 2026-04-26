import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Button from "../../components/ui/Button";

const groups = [
  {
    title: "React Hooks Avançados",
    members: 18,
    time: "Noite",
    description: "Estudo aprofundado de hooks customizados e otimização",
    tags: ["React", "Avançado"],
  },
  {
    title: "JavaScript para Iniciantes",
    members: 24,
    time: "Tarde",
    description: "Fundamentos da linguagem e primeiros projetos",
    tags: ["JavaScript", "Iniciante"],
  },
  {
    title: "Node.js e APIs REST",
    members: 15,
    time: "Noite",
    description: "Desenvolvimento de APIs escaláveis com Express",
    tags: ["Node.js", "Intermediário"],
  },
  {
    title: "Python para Data Science",
    members: 22,
    time: "Fins de semana",
    description: "Pandas, NumPy e visualização de dados",
    tags: ["Python", "Intermediário"],
  },
  {
    title: "TypeScript do Zero",
    members: 19,
    time: "Manhã",
    description: "Tipagem estática e boas práticas",
    tags: ["TypeScript", "Iniciante"],
  },
  {
    title: "Java Spring Boot",
    members: 12,
    time: "Noite",
    description: "Desenvolvimento enterprise com Spring Framework",
    tags: ["Java", "Avançado"],
  },
  {
    title: "Vue.js Essencial",
    members: 16,
    time: "Tarde",
    description: "Composition API e gerenciamento de estado",
    tags: ["Vue", "Intermediário"],
  },
  {
    title: "Algoritmos e Estruturas de Dados",
    members: 28,
    time: "Fins de semana",
    description: "Preparação para entrevistas técnicas",
    tags: ["JavaScript", "Intermediário"],
  },
];

export default function Groups() {
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get("role") === "admin";
  const [requestedGroup, setRequestedGroup] = useState(null);

  return (
    <Layout>
      <header className="page-header">
        <h1 className="page-title">Busca e Gestão de Grupos</h1>
      </header>

      <section className="card filter-bar" aria-label="Filtros de grupos">
        <div className="input-group">
          <label>Tecnologia</label>
          <input />
        </div>
        <div className="input-group">
          <label>Nível</label>
          <input />
        </div>
        <div className="input-group">
          <label>Disponibilidade</label>
          <input />
        </div>
      </section>

      <div className="grid-2">
        {groups.map((group) => (
          <article className="card group-card" key={group.title}>
            <h2>{group.title}</h2>
            <p className="group-meta">
              {group.members} membros <span style={{ margin: "0 12px" }}>•</span> {group.time}
            </p>
            <p className="group-description">{group.description}</p>
            <div className="chip-list">
              {group.tags.map((tag) => (
                <span className="chip" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            {isAdmin ? (
              <div className="group-actions">
                <Button>Editar</Button>
                <Button>Excluir</Button>
              </div>
            ) : (
              <Button className="full-button" onClick={() => setRequestedGroup(group)}>
                Solicitar Entrada
              </Button>
            )}
          </article>
        ))}
      </div>

      {requestedGroup && (
        <div className="modal-backdrop" role="presentation" onClick={() => setRequestedGroup(null)}>
          <section
            className="card modal-card modal-card--small"
            role="dialog"
            aria-modal="true"
            aria-labelledby="group-request-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2 id="group-request-title">Entrada solicitada</h2>
                <p className="page-subtitle">{requestedGroup.title}</p>
              </div>
            </div>

            <p className="modal-message">
              Sua solicitação foi enviada. Aguarde a aprovação de um administrador ou responsável pelo grupo.
            </p>

            <div className="modal-actions">
              <Button className="btn--primary" onClick={() => setRequestedGroup(null)}>
                Entendi
              </Button>
            </div>
          </section>
        </div>
      )}
    </Layout>
  );
}
