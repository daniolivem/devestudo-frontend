import { NavLink, useSearchParams } from "react-router-dom";

export default function Sidebar() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const query = role === "admin" || role === "mentor" ? `?role=${role}` : "";
  const links = [
    { to: `/dashboard${query}`, label: "Home" },
    { to: `/forum${query}`, label: "Fórum" },
    { to: `/groups${query}`, label: "Grupos" },
    { to: `/mentors${query}`, label: "Mentoria" },
    { to: `/profile${query}`, label: "Perfil" },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        Comunidade
        <br />
        DevEstudo
      </div>

      <nav className="sidebar-nav" aria-label="Navegação principal">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className="nav-link">
            {link.label}
          </NavLink>
        ))}
      </nav>

      <NavLink to="/" className="logout-link">
        Sair
      </NavLink>
    </aside>
  );
}
