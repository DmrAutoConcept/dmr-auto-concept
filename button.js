export function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded font-semibold ${props.className || ""}`}
    >
      {children}
    </button>
  );
}
