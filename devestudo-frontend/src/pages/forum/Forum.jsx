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

export default function Forum() {
  return (
    <Layout>
      <header className="page-header">
        <h1 className="page-title">Fórum Temático</h1>
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
        {topics.map((topic) => (
          <article className="card topic-card" key={topic.title}>
            <div>
              <h2 className="topic-title">{topic.title}</h2>
              <p className="topic-meta">
                <span>por {topic.author}</span>
                <span>•</span>
                <span>{topic.time}</span>
                <span>•</span>
                <span>{topic.replies}</span>
              </p>
              <div className="chip-list" style={{ marginTop: 16 }}>
                {topic.tags.map((tag) => (
                  <span className="chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="topic-replies mini-meta">
              {topic.replies}
              <br />
              respostas
            </p>
          </article>
        ))}
      </div>
    </Layout>
  );
}
