export default function Button({ children, className = "", type = "button" }) {
  return (
    <button className={`btn ${className}`.trim()} type={type}>
      {children}
    </button>
  );
}
