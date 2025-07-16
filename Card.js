export default function Card({ title, children }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', margin: '8px' }}>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}