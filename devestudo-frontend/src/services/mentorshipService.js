export const mentors = [
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

export const students = [
  { name: "Patrícia Melo", role: "Frontend Development", tags: ["React", "TypeScript", "Next.js"], sessions: 45 },
  { name: "Ronaldo Lima", role: "Backend e DevOps", tags: ["Node.js", "PostgreSQL", "Docker"], sessions: 62 },
  { name: "Rogério Marques", role: "Backend e DevOps", tags: ["Node.js", "PostgreSQL", "Docker"], sessions: 32 },
  { name: "Charles Mendes", role: "Backend e DevOps", tags: ["Node.js", "PostgreSQL", "Docker"], sessions: 56 },
  { name: "Rogério Ceni", role: "Backend e DevOps", tags: ["Node.js", "PostgreSQL", "Docker"], sessions: 28 },
  { name: "Diego Teles", role: "Backend e DevOps", tags: ["Node.js", "PostgreSQL", "Docker"], sessions: 34 },
];

export const mentorshipStatus = {
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

export const initialMentorships = [
  {
    mentorName: "Carlos Mendes",
    role: "Backend e DevOps",
    status: "APPROVED",
    channel: "Google Meet",
    availability: "Tardes",
    format: "Revisão de arquitetura e pareamento",
  },
];

export const initialMentorRequests = [
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

export function ratingToNumber(rating) {
  return Number.parseFloat(String(rating).split(" ")[0]) || 0;
}
