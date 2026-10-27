export default function Spinner({ className = '' }) {
  return (
    <div className={`w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin ${className}`} />
  );
}