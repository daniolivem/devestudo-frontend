import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Button from "../../components/ui/Button";

const tags = ["Python", "React", "Java", "JavaScript", "Node.js", "TypeScript", "Angular", "Vue", "PHP", "Ruby", "Go", "Rust"];

const topics = [
  {
    title: "Como implementar autenticação JWT em Node.js?",
    author: "Maria Santos",
    lastInteractionHours: 2,
    replies: 34,
    votes: 18,
    tags: ["Node.js", "JavaScript"],
    createdByCurrentMentor: false,
  },
  {
    title: "Diferença entre useEffect e useLayoutEffect no React",
    author: "Pedro Oliveira",
    lastInteractionHours: 4,
    replies: 28,
    votes: 11,
    tags: ["React", "JavaScript"],
    createdByCurrentMentor: true,
  },
  {
    title: "Melhores práticas para estruturar projetos Spring Boot",
    author: "Ana Costa",
    lastInteractionHours: 5,
    replies: 19,
    votes: 7,
    tags: ["Java"],
    createdByCurrentMentor: false,
  },
  {
    title: "Como fazer deploy de aplicação Python no Heroku?",
    author: "Carlos Mendes",
    lastInteractionHours: 6,
    replies: 42,
    votes: 15,
    tags: ["Python"],
    createdByCurrentMentor: false,
  },
  {
    title: "TypeScript: quando usar type vs interface?",
    author: "Juliana Rocha",
    lastInteractionHours: 8,
    replies: 56,
    votes: 21,
    tags: ["TypeScript", "JavaScript"],
    createdByCurrentMentor: true,
  },
  {
    title: "Otimização de queries em PostgreSQL",
    author: "Roberto Silva",
    lastInteractionHours: 10,
    replies: 23,
    votes: 9,
    tags: ["Node.js"],
    createdByCurrentMentor: false,
  },
  {
    title: "Como gerenciar estado global no React sem Redux?",
    author: "Fernanda Lima",
    lastInteractionHours: 12,
    replies: 67,
    votes: 25,
    tags: ["React", "JavaScript"],
    createdByCurrentMentor: false,
  },
  {
    title: "Introdução ao desenvolvimento de APIs REST",
    author: "Bruno Costa",
    lastInteractionHours: 24,
    replies: 89,
    votes: 30,
    tags: ["Node.js", "JavaScript"],
    createdByCurrentMentor: false,
  },
];

function createTopicSlug(title) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatLastInteraction(hours) {
  if (hours === 0) {
    return "agora";
  }

  if (hours < 24) {
    return `há ${hours}h`;
  }

  const days = Math.floor(hours / 24);
  return `há ${days}d`;
}

export default function Forum() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const isAdmin = role === "admin";
  const isMentor = role === "mentor";
  const roleQuery = role === "admin" || role === "mentor" ? `?role=${role}` : "";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topicBeingEdited, setTopicBeingEdited] = useState(null);
  const [forumTopics, setForumTopics] = useState(topics);

  function openTopic(topic) {
    navigate(`/forum/${createTopicSlug(topic.title)}${roleQuery}`, { state: { topic } });
  }

  function handleCreateThread(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = String(formData.get("title") || "").trim();
    const content = String(formData.get("content") || "").trim();
    const selectedTags = formData.getAll("tags").map((tag) => String(tag));

    if (!title || !content) {
      return;
    }

    const newTopic = {
      title,
      content,
      author: "Você",
      lastInteractionHours: 0,
      replies: 0,
      votes: 0,
      tags: selectedTags,
      createdByCurrentMentor: isMentor,
    };

    setForumTopics((currentTopics) => [newTopic, ...currentTopics]);
    setIsModalOpen(false);
    e.currentTarget.reset();
    openTopic(newTopic);
  }

  function handleUpdateThread(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const originalTitle = String(formData.get("originalTitle") || "");
    const title = String(formData.get("title") || "").trim();
    const content = String(formData.get("content") || "").trim();
    const selectedTags = formData.getAll("tags").map((tag) => String(tag));

    if (!title || !content) {
      return;
    }

    setForumTopics((currentTopics) =>
      currentTopics.map((topic) =>
        topic.title === originalTitle
          ? {
              ...topic,
              title,
              content,
              tags: selectedTags,
              lastInteractionHours: 0,
            }
          : topic,
      ),
    );
    setTopicBeingEdited(null);
  }

  function deleteTopic(topicTitle) {
    setForumTopics((currentTopics) => currentTopics.filter((topic) => topic.title !== topicTitle));
  }

  function upvoteTopic(topicTitle) {
    setForumTopics((currentTopics) =>
      currentTopics.map((topic) => (topic.title === topicTitle ? { ...topic, votes: topic.votes + 1 } : topic)),
    );
  }

  return (
    <Layout>
      <header className="page-header forum-header">
        <div>
          <h1 className="page-title">{isAdmin ? "Moderação de Fórum" : "Fórum Temático"}</h1>
          <p className="page-subtitle">
            {isAdmin
              ? "Gerencie tópicos, conteúdos e respostas da comunidade"
              : isMentor
                ? "Crie fóruns, gerencie os seus tópicos e participe das discussões da comunidade"
                : "Compartilhe dúvidas e discussões com a comunidade"}
          </p>
        </div>
        <Button className="btn--primary" onClick={() => setIsModalOpen(true)}>
          Criar novo fórum
        </Button>
      </header>

      <input className="field-input forum-search" placeholder="Buscar por título ou palavra-chave..." />

      <div className="chip-list" style={{ marginBottom: 24 }}>
        {tags.map((tag) => (
          <Button className="btn--small" key={tag}>
            {tag}
          </Button>
        ))}
      </div>

      <div className="stack">
        {forumTopics.map((topic) => (
          <article
            className="card topic-card topic-card--clickable"
            key={topic.title}
            onClick={() => openTopic(topic)}
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openTopic(topic);
              }
            }}
          >
            <div>
              <h2 className="topic-title">{topic.title}</h2>
              <p className="topic-meta">
                <span>por {topic.author}</span>
                <span>•</span>
                <span>Última interação {formatLastInteraction(topic.lastInteractionHours)}</span>
                <span>•</span>
                <span>{topic.replies} respostas</span>
                {isMentor && topic.createdByCurrentMentor && (
                  <>
                    <span>•</span>
                    <span>Criado por você</span>
                  </>
                )}
              </p>
              {topic.content && <p className="topic-preview">{topic.content}</p>}
              {topic.tags.length > 0 && (
                <div className="chip-list" style={{ marginTop: 16 }}>
                  {topic.tags.map((tag) => (
                    <span className="chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="topic-side">
              <button
                className="vote-button"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  upvoteTopic(topic.title);
                }}
                aria-label={`Dar upvote em ${topic.title}`}
              >
                ▲
                <strong>{topic.votes}</strong>
              </button>
            {isAdmin || (isMentor && topic.createdByCurrentMentor) ? (
              <div className="forum-admin-actions">
                <Button
                  className="btn--small"
                  onClick={(e) => {
                    e.stopPropagation();
                    openTopic(topic);
                  }}
                >
                  {isAdmin ? "Moderar" : "Abrir"}
                </Button>
                <Button
                  className="btn--small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTopicBeingEdited(topic);
                  }}
                >
                  Editar
                </Button>
                <Button
                  className="btn--small"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTopic(topic.title);
                  }}
                >
                  Excluir
                </Button>
              </div>
            ) : (
              <p className="topic-replies mini-meta">
                {topic.replies}
                <br />
                respostas
              </p>
            )}
            </div>
          </article>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsModalOpen(false)}>
          <section
            className="card modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-thread-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2 id="create-thread-title">Criar novo fórum</h2>
                <p className="page-subtitle">Informe os dados iniciais do tópico</p>
              </div>
            </div>

            <form className="modal-form" onSubmit={handleCreateThread}>
              <div className="input-group">
                <label>Título</label>
                <input name="title" placeholder="Ex: Como estudar React Hooks?" />
              </div>

              <div className="input-group">
                <label>Conteúdo</label>
                <textarea name="content" placeholder="Descreva sua dúvida ou discussão..." rows="6" />
              </div>

              <fieldset className="tag-fieldset">
                <legend>Tecnologias</legend>
                <div className="tag-options">
                  {tags.map((tag) => (
                    <label className="tag-option" key={tag}>
                      <input type="checkbox" name="tags" value={tag} />
                      <span>{tag}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="modal-actions">
                <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                <Button className="btn--primary" type="submit">
                  Criar fórum
                </Button>
              </div>
            </form>
          </section>
        </div>
      )}

      {topicBeingEdited && (
        <div className="modal-backdrop" role="presentation" onClick={() => setTopicBeingEdited(null)}>
          <section
            className="card modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-thread-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2 id="edit-thread-title">Editar fórum</h2>
                <p className="page-subtitle">Atualize título, conteúdo e tecnologias do tópico</p>
              </div>
            </div>

            <form className="modal-form" onSubmit={handleUpdateThread}>
              <input type="hidden" name="originalTitle" value={topicBeingEdited.title} />

              <div className="input-group">
                <label>Título</label>
                <input name="title" defaultValue={topicBeingEdited.title} />
              </div>

              <div className="input-group">
                <label>Conteúdo</label>
                <textarea name="content" defaultValue={topicBeingEdited.content || ""} rows="6" />
              </div>

              <fieldset className="tag-fieldset">
                <legend>Tecnologias</legend>
                <div className="tag-options">
                  {tags.map((tag) => (
                    <label className="tag-option" key={tag}>
                      <input type="checkbox" name="tags" value={tag} defaultChecked={topicBeingEdited.tags.includes(tag)} />
                      <span>{tag}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="modal-actions">
                <Button onClick={() => setTopicBeingEdited(null)}>Cancelar</Button>
                <Button className="btn--primary" type="submit">
                  Salvar alterações
                </Button>
              </div>
            </form>
          </section>
        </div>
      )}
    </Layout>
  );
}
