export const Card = ({ children }) => (
  <div className="bg-gray-900 text-white rounded-xl shadow-lg p-6 max-w-md w-full">{children}</div>
);
export const CardContent = ({ children }) => (
  <div className="space-y-4">{children}</div>
);