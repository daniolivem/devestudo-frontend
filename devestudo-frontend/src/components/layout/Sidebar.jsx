import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside style={{ width: "220px", padding: "20px" }}>
      <h2>DevEstudo</h2>

      <nav style={{ marginTop: "20px" }}>
        <p>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
            Dashboard
          </NavLink>
        </p>

        <p>
          <NavLink to="/forum" className={({ isActive }) => isActive ? "active" : ""}>
            Fórum
          </NavLink>
        </p>

        <p>
          <NavLink to="/groups">Grupos</NavLink>
        </p>

        <p>
          <NavLink to="/mentors">Mentores</NavLink>
        </p>
      </nav>
    </aside>
  );
}