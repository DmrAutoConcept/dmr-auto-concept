export const Button = ({ children, ...props }) => (
  <button className="bg-white text-black font-semibold px-6 py-2 rounded-full" {...props}>
    {children}
  </button>
);