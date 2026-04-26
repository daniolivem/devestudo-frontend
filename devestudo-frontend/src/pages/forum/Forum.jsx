import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Button from "../../components/ui/Button";
import TopicCard from "../../components/forum/TopicCard";
import TopicFormModal from "../../components/forum/TopicFormModal";
import { useForumTopics } from "../../hooks/useForumTopics";
import { forumTags } from "../../services/forumService";
import { createTopicSlug } from "../../utils/forum";

export default function Forum() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const isAdmin = role === "admin";
  const isMentor = role === "mentor";
  const roleQuery = role === "admin" || role === "mentor" ? `?role=${role}` : "";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topicBeingEdited, setTopicBeingEdited] = useState(null);
  const { topics, createTopic, updateTopic, deleteTopic, upvoteTopic } = useForumTopics();

  function openTopic(topic) {
    navigate(`/forum/${createTopicSlug(topic.title)}${roleQuery}`, { state: { topic } });
  }

  function handleCreateThread(topicPayload) {
    const newTopic = {
      title: topicPayload.title,
      content: topicPayload.content,
      author: "Você",
      lastInteractionHours: 0,
      replies: 0,
      votes: 0,
      hasVoted: false,
      tags: topicPayload.tags,
      createdByCurrentMentor: isMentor,
    };

    createTopic(newTopic);
    setIsModalOpen(false);
    openTopic(newTopic);
  }

  function handleUpdateThread(topicPayload) {
    updateTopic(topicPayload.originalTitle, {
      title: topicPayload.title,
      content: topicPayload.content,
      tags: topicPayload.tags,
    });
    setTopicBeingEdited(null);
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
        {forumTags.map((tag) => (
          <Button className="btn--small" key={tag}>
            {tag}
          </Button>
        ))}
      </div>

      <div className="stack">
        {topics.map((topic) => (
          <TopicCard
            key={topic.title}
            topic={topic}
            isAdmin={isAdmin}
            isMentor={isMentor}
            onOpen={openTopic}
            onEdit={setTopicBeingEdited}
            onDelete={deleteTopic}
            onUpvote={upvoteTopic}
          />
        ))}
      </div>

      {isModalOpen && (
        <TopicFormModal
          title="Criar novo fórum"
          subtitle="Informe os dados iniciais do tópico"
          submitLabel="Criar fórum"
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateThread}
        />
      )}

      {topicBeingEdited && (
        <TopicFormModal
          title="Editar fórum"
          subtitle="Atualize título, conteúdo e tecnologias do tópico"
          submitLabel="Salvar alterações"
          initialTopic={topicBeingEdited}
          onClose={() => setTopicBeingEdited(null)}
          onSubmit={handleUpdateThread}
        />
      )}
    </Layout>
  );
}
