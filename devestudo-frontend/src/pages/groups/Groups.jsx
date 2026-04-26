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
    createdByCurrentMentor: true,
  },
  {
    title: "JavaScript para Iniciantes",
    members: 24,
    time: "Tarde",
    description: "Fundamentos da linguagem e primeiros projetos",
    tags: ["JavaScript", "Iniciante"],
    createdByCurrentMentor: false,
  },
  {
    title: "Node.js e APIs REST",
    members: 15,
    time: "Noite",
    description: "Desenvolvimento de APIs escaláveis com Express",
    tags: ["Node.js", "Intermediário"],
    createdByCurrentMentor: true,
  },
  {
    title: "Python para Data Science",
    members: 22,
    time: "Fins de semana",
    description: "Pandas, NumPy e visualização de dados",
    tags: ["Python", "Intermediário"],
    createdByCurrentMentor: false,
  },
  {
    title: "TypeScript do Zero",
    members: 19,
    time: "Manhã",
    description: "Tipagem estática e boas práticas",
    tags: ["TypeScript", "Iniciante"],
    createdByCurrentMentor: false,
  },
  {
    title: "Java Spring Boot",
    members: 12,
    time: "Noite",
    description: "Desenvolvimento enterprise com Spring Framework",
    tags: ["Java", "Avançado"],
    createdByCurrentMentor: false,
  },
  {
    title: "Vue.js Essencial",
    members: 16,
    time: "Tarde",
    description: "Composition API e gerenciamento de estado",
    tags: ["Vue", "Intermediário"],
    createdByCurrentMentor: false,
  },
  {
    title: "Algoritmos e Estruturas de Dados",
    members: 28,
    time: "Fins de semana",
    description: "Preparação para entrevistas técnicas",
    tags: ["JavaScript", "Intermediário"],
    createdByCurrentMentor: false,
  },
];

export default function Groups() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const isAdmin = role === "admin";
  const isMentor = role === "mentor";
  const [requestedGroup, setRequestedGroup] = useState(null);
  const [managedGroups, setManagedGroups] = useState(groups);
  const [editingGroup, setEditingGroup] = useState(null);

  function handleSaveGroup(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const originalTitle = String(formData.get("originalTitle") || "");
    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const technology = String(formData.get("technology") || "").trim();
    const level = String(formData.get("level") || "").trim();
    const time = String(formData.get("time") || "").trim();

    if (!title || !description) {
      return;
    }

    const savedGroup = {
      title,
      members: editingGroup?.members || 0,
      time: time || "A definir",
      description,
      tags: [technology || "Geral", level || "Aberto"],
      createdByCurrentMentor: isMentor || Boolean(editingGroup?.createdByCurrentMentor),
    };

    setManagedGroups((currentGroups) => {
      if (!originalTitle) {
        return [savedGroup, ...currentGroups];
      }

      return currentGroups.map((group) => (group.title === originalTitle ? savedGroup : group));
    });
    setEditingGroup(null);
  }

  function handleDeleteGroup(groupTitle) {
    setManagedGroups((currentGroups) => currentGroups.filter((group) => group.title !== groupTitle));
  }

  if (isAdmin) {
    return (
      <Layout>
        <header className="page-header groups-admin-header">
          <div>
            <h1 className="page-title">Gestão de Grupos</h1>
            <p className="page-subtitle">Gerencie grupos, dados de exibição e disponibilidade para os alunos.</p>
          </div>
          <Button className="btn--primary" onClick={() => setEditingGroup({})}>
            Criar grupo
          </Button>
        </header>

        <section className="card filter-bar groups-filter-bar" aria-label="Filtros de grupos">
          <div className="input-group">
            <label>Tecnologia</label>
            <input placeholder="React, Node.js, Python..." />
          </div>
          <div className="input-group">
            <label>Nível</label>
            <input placeholder="Iniciante, intermediário..." />
          </div>
          <div className="input-group">
            <label>Disponibilidade</label>
            <input placeholder="Manhã, tarde, noite..." />
          </div>
        </section>

        <section className="card admin-groups-panel">
          <div className="admin-groups-head">
            <span>Grupo</span>
            <span>Membros</span>
            <span>Disponibilidade</span>
            <span>Ações</span>
          </div>

          <div className="list-divider">
            {managedGroups.map((group) => (
              <article className="admin-group-row" key={group.title}>
                <div>
                  <h2>{group.title}</h2>
                  <p>{group.description}</p>
                  <div className="chip-list">
                    {group.tags.map((tag) => (
                      <span className="chip" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <strong>{group.members}</strong>
                <span className="group-meta">{group.time}</span>
                <div className="admin-group-actions">
                  <Button className="btn--small" onClick={() => setEditingGroup(group)}>
                    Editar
                  </Button>
                  <Button className="btn--small" onClick={() => handleDeleteGroup(group.title)}>
                    Excluir
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {editingGroup && (
          <div className="modal-backdrop" role="presentation" onClick={() => setEditingGroup(null)}>
            <section
              className="card modal-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="group-edit-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <h2 id="group-edit-title">{editingGroup.title ? "Editar grupo" : "Criar grupo"}</h2>
                  <p className="page-subtitle">Informe os dados do grupo</p>
                </div>
              </div>

              <form className="modal-form" onSubmit={handleSaveGroup}>
                <input type="hidden" name="originalTitle" value={editingGroup.title || ""} />

                <div className="input-group">
                  <label>Nome</label>
                  <input name="title" defaultValue={editingGroup.title || ""} placeholder="Ex: React Hooks Avançados" />
                </div>

                <div className="input-group">
                  <label>Descrição</label>
                  <textarea
                    name="description"
                    defaultValue={editingGroup.description || ""}
                    placeholder="Descreva o objetivo do grupo"
                    rows="4"
                  />
                </div>

                <div className="grid-2">
                  <div className="input-group">
                    <label>Tecnologia</label>
                    <input name="technology" defaultValue={editingGroup.tags?.[0] || ""} placeholder="React" />
                  </div>
                  <div className="input-group">
                    <label>Nível</label>
                    <input name="level" defaultValue={editingGroup.tags?.[1] || ""} placeholder="Intermediário" />
                  </div>
                </div>

                <div className="input-group">
                  <label>Disponibilidade</label>
                  <input name="time" defaultValue={editingGroup.time || ""} placeholder="Noite" />
                </div>

                <div className="modal-actions">
                  <Button onClick={() => setEditingGroup(null)}>Cancelar</Button>
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

  return (
    <Layout>
      <header className="page-header">
        <div className="groups-user-header">
          <div>
            <h1 className="page-title">{isMentor ? "Meus Grupos e Comunidades" : "Busca e Gestão de Grupos"}</h1>
            {isMentor && (
              <p className="page-subtitle">Crie grupos, gerencie os seus e solicite entrada em outros grupos.</p>
            )}
          </div>
          {isMentor && (
            <Button className="btn--primary" onClick={() => setEditingGroup({ createdByCurrentMentor: true })}>
              Criar grupo
            </Button>
          )}
        </div>
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
        {managedGroups.map((group) => (
          <article className="card group-card" key={group.title}>
            <div className="group-card-title-row">
              <h2>{group.title}</h2>
              {isMentor && group.createdByCurrentMentor && <span className="status-badge">Criado por você</span>}
            </div>
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
            {isMentor && group.createdByCurrentMentor ? (
              <div className="group-actions">
                <Button onClick={() => setEditingGroup(group)}>Editar</Button>
                <Button onClick={() => handleDeleteGroup(group.title)}>Excluir</Button>
              </div>
            ) : (
              <Button className="full-button" onClick={() => setRequestedGroup(group)}>
                Solicitar Entrada
              </Button>
            )}
          </article>
        ))}
      </div>

      {isMentor && editingGroup && (
        <div className="modal-backdrop" role="presentation" onClick={() => setEditingGroup(null)}>
          <section
            className="card modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mentor-group-edit-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2 id="mentor-group-edit-title">{editingGroup.title ? "Editar meu grupo" : "Criar grupo"}</h2>
                <p className="page-subtitle">Mentores podem gerenciar apenas os grupos criados por eles.</p>
              </div>
            </div>

            <form className="modal-form" onSubmit={handleSaveGroup}>
              <input type="hidden" name="originalTitle" value={editingGroup.title || ""} />

              <div className="input-group">
                <label>Nome</label>
                <input name="title" defaultValue={editingGroup.title || ""} placeholder="Ex: React Hooks Avançados" />
              </div>

              <div className="input-group">
                <label>Descrição</label>
                <textarea
                  name="description"
                  defaultValue={editingGroup.description || ""}
                  placeholder="Descreva o objetivo do grupo"
                  rows="4"
                />
              </div>

              <div className="grid-2">
                <div className="input-group">
                  <label>Tecnologia</label>
                  <input name="technology" defaultValue={editingGroup.tags?.[0] || ""} placeholder="React" />
                </div>
                <div className="input-group">
                  <label>Nível</label>
                  <input name="level" defaultValue={editingGroup.tags?.[1] || ""} placeholder="Intermediário" />
                </div>
              </div>

              <div className="input-group">
                <label>Disponibilidade</label>
                <input name="time" defaultValue={editingGroup.time || ""} placeholder="Noite" />
              </div>

              <div className="modal-actions">
                <Button onClick={() => setEditingGroup(null)}>Cancelar</Button>
                <Button className="btn--primary" type="submit">
                  Salvar
                </Button>
              </div>
            </form>
          </section>
        </div>
      )}

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
