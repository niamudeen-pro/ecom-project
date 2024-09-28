export default function Skeleton({ className = "", children }) {
  return (
    <div className={`bg-gray-100 h-6 animate-pulse flexCenter ${className}`}>
      {children}
    </div>
  );
}
