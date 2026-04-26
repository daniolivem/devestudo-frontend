export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* SIDEBAR */}
      <aside style={{
        width: "220px",
        background: "#fff",
        padding: "20px",
        borderRight: "1px solid #ddd"
      }}>
        <h2>DevEstudo</h2>

        <nav style={{ marginTop: "20px" }}>
          <p>Dashboard</p>
          <p>Fórum</p>
          <p>Grupos</p>
          <p>Mentores</p>
        </nav>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* HEADER */}
        <header style={{
          background: "#fff",
          padding: "10px",
          borderBottom: "1px solid #ddd"
        }}>
          <p>Bem-vinda 👋</p>
        </header>

        {/* CONTEÚDO DAS PÁGINAS */}
        <main style={{ padding: "20px" }}>
          {children}
        </main>

      </div>
    </div>
  );
}