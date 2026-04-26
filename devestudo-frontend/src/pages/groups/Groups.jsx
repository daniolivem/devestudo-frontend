import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Button from "../../components/ui/Button";
import AdminGroupsPanel from "../../components/groups/AdminGroupsPanel";
import GroupCard from "../../components/groups/GroupCard";
import GroupFormModal from "../../components/groups/GroupFormModal";
import GroupRequestModal from "../../components/groups/GroupRequestModal";
import { useGroups } from "../../hooks/useGroups";

function GroupsFilterBar({ admin = false }) {
  return (
    <section className={admin ? "card filter-bar groups-filter-bar" : "card filter-bar"} aria-label="Filtros de grupos">
      <div className="input-group">
        <label>Tecnologia</label>
        <input placeholder={admin ? "React, Node.js, Python..." : ""} />
      </div>
      <div className="input-group">
        <label>Nível</label>
        <input placeholder={admin ? "Iniciante, intermediário..." : ""} />
      </div>
      <div className="input-group">
        <label>Disponibilidade</label>
        <input placeholder={admin ? "Manhã, tarde, noite..." : ""} />
      </div>
    </section>
  );
}

export default function Groups() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const isAdmin = role === "admin";
  const isMentor = role === "mentor";
  const [requestedGroup, setRequestedGroup] = useState(null);
  const [editingGroup, setEditingGroup] = useState(null);
  const { groups, saveGroup, deleteGroup } = useGroups({ isMentor });

  function handleSaveGroup(groupPayload) {
    saveGroup(groupPayload, editingGroup);
    setEditingGroup(null);
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

        <GroupsFilterBar admin />
        <AdminGroupsPanel groups={groups} onEdit={setEditingGroup} onDelete={deleteGroup} />

        {editingGroup && (
          <GroupFormModal
            group={editingGroup}
            title={editingGroup.title ? "Editar grupo" : "Criar grupo"}
            subtitle="Informe os dados do grupo"
            onClose={() => setEditingGroup(null)}
            onSubmit={handleSaveGroup}
          />
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
            {isMentor && <p className="page-subtitle">Crie grupos, gerencie os seus e solicite entrada em outros grupos.</p>}
          </div>
          {isMentor && (
            <Button className="btn--primary" onClick={() => setEditingGroup({ createdByCurrentMentor: true })}>
              Criar grupo
            </Button>
          )}
        </div>
      </header>

      <GroupsFilterBar />

      <div className="grid-2">
        {groups.map((group) => (
          <GroupCard
            key={group.title}
            group={group}
            isMentor={isMentor}
            onEdit={setEditingGroup}
            onDelete={deleteGroup}
            onRequest={setRequestedGroup}
          />
        ))}
      </div>

      {isMentor && editingGroup && (
        <GroupFormModal
          group={editingGroup}
          title={editingGroup.title ? "Editar meu grupo" : "Criar grupo"}
          subtitle="Mentores podem gerenciar apenas os grupos criados por eles."
          onClose={() => setEditingGroup(null)}
          onSubmit={handleSaveGroup}
        />
      )}

      <GroupRequestModal group={requestedGroup} onClose={() => setRequestedGroup(null)} />
    </Layout>
  );
}
