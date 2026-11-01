export const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl shadow-md ${className}`}>{children}</div>
);
export const CardContent = ({ children, className = "" }) => (
  <div className={`w-full rounded-2xl ${className}`}>{children}</div>
);
