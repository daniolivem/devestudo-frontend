import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Button from "../../components/ui/Button";

const tags = ["Python", "React", "Java", "JavaScript", "Node.js", "TypeScript", "Angular", "Vue", "PHP", "Ruby", "Go", "Rust"];

const topics = [
  {
    title: "Como implementar autenticação JWT em Node.js?",
    author: "Maria Santos",
    time: "2h atrás",
    replies: 34,
    tags: ["Node.js", "JavaScript"],
  },
  {
    title: "Diferença entre useEffect e useLayoutEffect no React",
    author: "Pedro Oliveira",
    time: "4h atrás",
    replies: 28,
    tags: ["React", "JavaScript"],
  },
  {
    title: "Melhores práticas para estruturar projetos Spring Boot",
    author: "Ana Costa",
    time: "5h atrás",
    replies: 19,
    tags: ["Java"],
  },
  {
    title: "Como fazer deploy de aplicação Python no Heroku?",
    author: "Carlos Mendes",
    time: "6h atrás",
    replies: 42,
    tags: ["Python"],
  },
  {
    title: "TypeScript: quando usar type vs interface?",
    author: "Juliana Rocha",
    time: "8h atrás",
    replies: 56,
    tags: ["TypeScript", "JavaScript"],
  },
  {
    title: "Otimização de queries em PostgreSQL",
    author: "Roberto Silva",
    time: "10h atrás",
    replies: 23,
    tags: ["Node.js"],
  },
  {
    title: "Como gerenciar estado global no React sem Redux?",
    author: "Fernanda Lima",
    time: "12h atrás",
    replies: 67,
    tags: ["React", "JavaScript"],
  },
  {
    title: "Introdução ao desenvolvimento de APIs REST",
    author: "Bruno Costa",
    time: "1d atrás",
    replies: 89,
    tags: ["Node.js", "JavaScript"],
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

export default function Forum() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const isAdmin = role === "admin";
  const roleQuery = role === "admin" || role === "mentor" ? `?role=${role}` : "";
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      time: "agora",
      replies: 0,
      tags: selectedTags,
    };

    setForumTopics((currentTopics) => [newTopic, ...currentTopics]);
    setIsModalOpen(false);
    e.currentTarget.reset();
    openTopic(newTopic);
  }

  return (
    <Layout>
      <header className="page-header forum-header">
        <div>
          <h1 className="page-title">Fórum Temático</h1>
          <p className="page-subtitle">Compartilhe dúvidas e discussões com a comunidade</p>
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
                <span>{topic.time}</span>
                <span>•</span>
                <span>{topic.replies}</span>
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
            {isAdmin ? (
              <Button
                className="btn--small"
                onClick={(e) => {
                  e.stopPropagation();
                  openTopic(topic);
                }}
              >
                Moderar
              </Button>
            ) : (
              <p className="topic-replies mini-meta">
                {topic.replies}
                <br />
                respostas
              </p>
            )}
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
    </Layout>
  );
}
