import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Button from "../../components/ui/Button";

const topicDetails = {
  "como-implementar-autenticacao-jwt-em-node-js": {
    title: "Como implementar autenticação JWT em Node.js?",
    author: "Maria Santos",
    time: "2h atrás",
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
    time: "4h atrás",
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

export default function Topic() {
  const { topicSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const roleQuery = role === "admin" || role === "mentor" ? `?role=${role}` : "";

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
        time: "recentemente",
        tags: [],
        content: "Este fórum ainda não possui conteúdo carregado localmente.",
        replies: [],
      }
    );
  }, [location.state, topicSlug]);

  const [replies, setReplies] = useState(initialTopic.replies);

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
      },
    ]);
    e.currentTarget.reset();
  }

  return (
    <Layout>
      <header className="page-header topic-detail-header">
        <Button onClick={() => navigate(`/forum${roleQuery}`)}>Voltar ao fórum</Button>
      </header>

      <article className="card topic-detail">
        <h1 className="page-title">{initialTopic.title}</h1>
        <p className="topic-meta">
          <span>por {initialTopic.author}</span>
          <span>•</span>
          <span>{initialTopic.time}</span>
          <span>•</span>
          <span>{replies.length} respostas</span>
        </p>

        {initialTopic.tags.length > 0 && (
          <div className="chip-list topic-detail-tags">
            {initialTopic.tags.map((tag) => (
              <span className="chip" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="topic-detail-content">{initialTopic.content}</p>
      </article>

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
                <span className="status-badge">{reply.votes} votos</span>
              </div>
              <p>{reply.content}</p>
            </article>
          ))}
        </div>
      </section>

      {role !== "admin" && (
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
