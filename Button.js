export default function Button({ children }) {
  return (
    <button style={{ padding: '10px 20px', backgroundColor: '#000', color: '#fff', borderRadius: '5px' }}>
      {children}
    </button>
  );
}