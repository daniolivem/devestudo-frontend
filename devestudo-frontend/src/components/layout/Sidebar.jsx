import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { to: "/dashboard", label: "Home" },
    { to: "/forum", label: "Fórum" },
    { to: "/groups", label: "Grupos" },
    { to: "/mentors", label: "Mentoria" },
    { to: "/profile", label: "Perfil" },
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
