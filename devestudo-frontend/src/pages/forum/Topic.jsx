import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Button from "../../components/ui/Button";

const topicDetails = {
  "como-implementar-autenticacao-jwt-em-node-js": {
    title: "Como implementar autenticação JWT em Node.js?",
    author: "Maria Santos",
    lastInteractionHours: 2,
    votes: 18,
    tags: ["Node.js", "JavaScript"],
    content:
      "Estou criando uma API em Node.js e quero proteger rotas com JWT. Qual seria uma estrutura simples e segura para gerar o token no login e validar nas rotas privadas?",
    replies: [
      {
        author: "Carlos Mendes",
        time: "1h atrás",
        content: "Separe a autenticação em middleware. No login, gere o token com o id do usuário e uma expiração curta.",
        votes: 8,
      },
      {
        author: "Ana Costa",
        time: "45min atrás",
        content: "Também vale guardar o segredo em variável de ambiente e nunca retornar dados sensíveis no payload.",
        votes: 5,
      },
    ],
  },
  "diferenca-entre-useeffect-e-uselayouteffect-no-react": {
    title: "Diferença entre useEffect e useLayoutEffect no React",
    author: "Pedro Oliveira",
    lastInteractionHours: 4,
    votes: 11,
    tags: ["React", "JavaScript"],
    content:
      "Em quais casos faz sentido usar useLayoutEffect no lugar de useEffect? Tenho dúvidas sobre impacto visual e performance.",
    replies: [
      {
        author: "Beatriz Lima",
        time: "3h atrás",
        content: "Use useLayoutEffect quando precisa medir ou alterar layout antes do navegador pintar a tela.",
        votes: 6,
      },
    ],
  },
};

function fallbackTitleFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
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

export default function Topic() {
  const { topicSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const roleQuery = role === "admin" || role === "mentor" ? `?role=${role}` : "";
  const isAdmin = role === "admin";

  const initialTopic = useMemo(() => {
    const routedTopic = location.state?.topic;

    if (routedTopic) {
      return {
        ...routedTopic,
        content: routedTopic.content || "Conteúdo inicial do fórum.",
        replies: [],
      };
    }

    return (
      topicDetails[topicSlug] || {
        title: fallbackTitleFromSlug(topicSlug || "forum"),
        author: "Comunidade DevEstudo",
        lastInteractionHours: 0,
        votes: 0,
        hasVoted: false,
        tags: [],
        content: "Este fórum ainda não possui conteúdo carregado localmente.",
        replies: [],
      }
    );
  }, [location.state, topicSlug]);

  const [currentTopic, setCurrentTopic] = useState(initialTopic);
  const [replies, setReplies] = useState(initialTopic.replies);
  const [isEditingTopic, setIsEditingTopic] = useState(false);

  function handleReply(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = String(formData.get("content") || "").trim();

    if (!content) {
      return;
    }

    setReplies((currentReplies) => [
      ...currentReplies,
      {
        author: "Você",
        time: "agora",
        content,
        votes: 0,
        hasVoted: false,
      },
    ]);
    e.currentTarget.reset();
  }

  function handleUpdateTopic(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = String(formData.get("title") || "").trim();
    const content = String(formData.get("content") || "").trim();

    if (!title || !content) {
      return;
    }

    setCurrentTopic((topic) => ({
      ...topic,
      title,
      content,
      lastInteractionHours: 0,
    }));
    setIsEditingTopic(false);
  }

  function deleteReply(replyToDelete) {
    setReplies((currentReplies) => currentReplies.filter((reply) => reply !== replyToDelete));
  }

  function upvoteTopic() {
    setCurrentTopic((topic) =>
      topic.hasVoted ? topic : { ...topic, votes: (topic.votes || 0) + 1, hasVoted: true },
    );
  }

  function upvoteReply(replyToUpvote) {
    setReplies((currentReplies) =>
      currentReplies.map((reply) =>
        reply === replyToUpvote && !reply.hasVoted ? { ...reply, votes: reply.votes + 1, hasVoted: true } : reply,
      ),
    );
  }

  return (
    <Layout>
      <header className="page-header topic-detail-header">
        <Button onClick={() => navigate(`/forum${roleQuery}`)}>Voltar ao fórum</Button>
      </header>

      <article className="card topic-detail">
        <div className="topic-detail-title-row">
          <h1 className="page-title">{currentTopic.title}</h1>
          {isAdmin && (
            <div className="forum-admin-actions">
              <Button className="btn--small" onClick={() => setIsEditingTopic(true)}>
                Editar
              </Button>
              <Button className="btn--small" onClick={() => navigate(`/forum${roleQuery}`)}>
                Excluir tópico
              </Button>
            </div>
          )}
        </div>
        <p className="topic-meta">
          <span>por {currentTopic.author}</span>
          <span>•</span>
          <span>Última interação {formatLastInteraction(currentTopic.lastInteractionHours)}</span>
          <span>•</span>
          <span>{replies.length} respostas</span>
        </p>

        <button
          className={currentTopic.hasVoted ? "vote-button vote-button--inline vote-button--voted" : "vote-button vote-button--inline"}
          type="button"
          disabled={currentTopic.hasVoted}
          onClick={upvoteTopic}
        >
          ▲
          <strong>{currentTopic.votes || 0}</strong>
          {currentTopic.hasVoted ? "votado" : "upvotes"}
        </button>

        {currentTopic.tags.length > 0 && (
          <div className="chip-list topic-detail-tags">
            {currentTopic.tags.map((tag) => (
              <span className="chip" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="topic-detail-content">{currentTopic.content}</p>
      </article>

      {isAdmin && isEditingTopic && (
        <section className="card reply-form-card">
          <h2>Editar tópico</h2>
          <form className="modal-form" onSubmit={handleUpdateTopic}>
            <div className="input-group">
              <label>Título</label>
              <input name="title" defaultValue={currentTopic.title} />
            </div>
            <div className="input-group">
              <label>Conteúdo</label>
              <textarea name="content" defaultValue={currentTopic.content} rows="6" />
            </div>
            <div className="modal-actions">
              <Button onClick={() => setIsEditingTopic(false)}>Cancelar</Button>
              <Button className="btn--primary" type="submit">
                Salvar alterações
              </Button>
            </div>
          </form>
        </section>
      )}

      <section className="topic-replies-section">
        <h2>Respostas</h2>
        <div className="stack">
          {replies.map((reply) => (
            <article className="card reply-card" key={`${reply.author}-${reply.time}-${reply.content}`}>
              <div className="reply-header">
                <div>
                  <strong>{reply.author}</strong>
                  <p className="mini-meta">{reply.time}</p>
                </div>
                <div className="reply-actions">
                  <button
                    className={reply.hasVoted ? "vote-button vote-button--compact vote-button--voted" : "vote-button vote-button--compact"}
                    type="button"
                    disabled={reply.hasVoted}
                    onClick={() => upvoteReply(reply)}
                  >
                    ▲
                    <strong>{reply.votes}</strong>
                    {reply.hasVoted && <span>Votado</span>}
                  </button>
                  {isAdmin && (
                    <Button className="btn--small" onClick={() => deleteReply(reply)}>
                      Excluir resposta
                    </Button>
                  )}
                </div>
              </div>
              <p>{reply.content}</p>
            </article>
          ))}
        </div>
      </section>

      {!isAdmin && (
        <section className="card reply-form-card">
          <h2>Adicionar resposta</h2>
          <form className="modal-form" onSubmit={handleReply}>
            <div className="input-group">
              <label>Resposta</label>
              <textarea name="content" placeholder="Escreva sua contribuição..." rows="5" />
            </div>
            <div className="modal-actions">
              <Button className="btn--primary" type="submit">
                Responder
              </Button>
            </div>
          </form>
        </section>
      )}
    </Layout>
  );
}
